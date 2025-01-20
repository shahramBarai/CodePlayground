import { Redis }  from './deps.js';
import { grade } from "./services/gradingService.js";
import * as programmingService from "./services/programmingService.js";

const client = new Redis("redis://redis:6379");

client.on('error', (err) => console.log('Redis Client Error', err));

async function listenForMessage() { 
  const [key, message] = await client.blpop('grader', 0);

  console.log("Grader message: ", message);

  try {
    const submission = await JSON.parse(message);
    const submission_id = submission.id;
    const code = submission.code;
    const test_code = submission.test_code;
    
    const grader_feedback = await grade(code, test_code);

    let correct = false;
    if (grader_feedback.slice(-2) === "OK") {
      correct = true;
    }

    await programmingService.updateAssignmentSubmission(submission_id, grader_feedback, correct);
  } catch (e) {
    console.log(e);
  }
  await listenForMessage();
}

await listenForMessage();