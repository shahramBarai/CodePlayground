import { Redis } from '../deps.js';
import * as assignmentService from "../services/assignmentService.js";

const redis = new Redis("redis://redis:6379");

redis.on('error', (err) => console.log('Redis Client Error', err));

const sendAssignmentToQueue = (data) => {
    //redis.publish("grader", JSON.stringify(data));
    redis.lpush('grader', JSON.stringify(data));
};

const cacheMethodCalls = (object, methodsToFlushCacheWith = []) => {
  const handler = {
    get: (module, methodName) => {
      const method = module[methodName];
      return async (...methodArgs) => {
        if (methodsToFlushCacheWith.includes(methodName)) {
          await redis.flushdb()
          return await method.apply(this, methodArgs);
        }

        const cacheKey = `${methodName}-${JSON.stringify(methodArgs)}`;
        const cacheResult = await redis.get(cacheKey);
        if (!cacheResult) {
          const result = await method.apply(this, methodArgs);
          await redis.set(cacheKey, JSON.stringify(result));
          return result;
        }

        return JSON.parse(cacheResult);
      };
    },
  };

  return new Proxy(object, handler);
};

const cachedAssignmentService = cacheMethodCalls(assignmentService, []);

export { sendAssignmentToQueue, cachedAssignmentService };