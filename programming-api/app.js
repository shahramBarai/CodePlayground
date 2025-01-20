import * as AssignmentController from "./controllers/AssignmentController.js";
import * as SubmitionController from "./controllers/SubmissionController.js";
import { serve } from "./deps.js";

const createErrorResponse = (message) => {
  console.log(message);
  return new Response(JSON.stringify({ error: message }), { status: 400 });
};

const urlMapping = [
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/assignment/submit" }),
    fn: SubmitionController.handleAssignmentSubmition,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignment/status/:id" }),
    fn: SubmitionController.getAssignmentSubmissionStatus,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignment/:id" }),
    fn: AssignmentController.handleGetAssignment,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments" }),
    fn: AssignmentController.getListOfAssignments,
  }
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  
  try {
    return await mapping.fn(request, mappingResult);
  } catch (error) {
    console.log(`${error}`);
    return createErrorResponse(error);
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
