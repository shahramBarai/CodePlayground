import * as submissionService from "../services/submissonService.js";
import { sendAssignmentToQueue, cachedAssignmentService } from "../util/cacheUtil.js";
// ---> Helpers
const createJsonRequest = async (data, method="POST") => {
    return {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
};
// <--- Helpers

// Handle POST assignment submition
const handleAssignmentSubmition = async (request) => {
    // Check if request is a valid json object
    let requestData = await request.json();
    if(!requestData.code || !requestData.assignment_id || !requestData.userUuid) {
        throw new Error("Missing required fields (code, assifnment_id or userUuid)");
    }
    const pandingSubmissionId = await submissionService.getPendingSubmissionId(requestData.userUuid);
    if (pandingSubmissionId !== null) {
        return Response.json({
            error: `There is already a pending submission (${pandingSubmissionId})! Send a new one only after the previous one is ready!`
            });
    }
    let sub = await submissionService.getAssignmentSubmission(requestData.assignment_id, requestData.code, requestData.userUuid);
    if (!sub){
        sub = await submissionService.addNewSubmition(requestData.assignment_id, requestData.code, requestData.userUuid);
        const assignment = await cachedAssignmentService.getAssignmentById(requestData.assignment_id);
        const data = {
            id: sub.id,
            code: sub.code,
            test_code: assignment.test_code
        };
        sendAssignmentToQueue(data);
    }
    return Response.json({ result: sub });
};

const getAssignmentSubmissionStatus = async (request, urlPatternResult) => {
    const id = urlPatternResult.pathname.groups.id;
    const sub = await submissionService.getAssignmentSubmissionById(id);
    return Response.json({ result: sub });
}

export { handleAssignmentSubmition, getAssignmentSubmissionStatus };