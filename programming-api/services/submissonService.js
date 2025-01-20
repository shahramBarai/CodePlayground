import { sql } from "../database/database.js";

const getAssignmentSubmission = async (assignment_id, code, user_uuid) => {
    // Checks whether the student has submitted an assignment or not
    const submissionResult = await sql`SELECT * FROM programming_assignment_submissions 
                                                WHERE programming_assignment_id=${assignment_id} AND user_uuid=${user_uuid} AND code=${code};`;
    return submissionResult.length !== 0 ? submissionResult[0] : null;
};

const addNewSubmition = async (assignment_id, code, user_uuid) => {
    await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid) 
                        VALUES (${assignment_id}, ${code}, ${user_uuid});`;
    return getAssignmentSubmission(assignment_id, code, user_uuid)
};

const getAssignmentSubmissionById = async (id) => {
    const submisionDetails = await sql`SELECT * FROM programming_assignment_submissions WHERE id=${id};`;
    return submisionDetails ? submisionDetails[0] : {};
}

const getPendingSubmissionId = async (user_uuid) => {
    const result = await sql`SELECT id FROM programming_assignment_submissions WHERE user_uuid=${user_uuid} AND status='pending';`;
    return result.length !== 0 ? result[0].id : null;
}

export { getAssignmentSubmission, addNewSubmition, getAssignmentSubmissionById, getPendingSubmissionId};