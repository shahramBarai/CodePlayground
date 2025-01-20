import { sql } from "../database/database.js";

const updateAssignmentSubmission = async (id, grader_feedback, correct) => {
  await sql`UPDATE programming_assignment_submissions 
                      SET status='processed', grader_feedback=${grader_feedback}, correct=${correct} 
                      WHERE id=${id};`;
};

export { updateAssignmentSubmission };