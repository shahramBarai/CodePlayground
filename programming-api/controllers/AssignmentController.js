import { cachedAssignmentService } from "../util/cacheUtil.js";

// Handle GET requests to /api/assignments (return list of all assignments without code examples)
const getListOfAssignments = async (request) => {
  const assignments = await cachedAssignmentService.findAll();
  let data = [];
  assignments.forEach(assignment => {
      data[assignment.assignment_order - 1] = {
          id: assignment.id,
          title: assignment.title,
          handout: assignment.handout
      }
  });
  return Response.json({ assignments: assignments });
}

const handleGetAssignment = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const assignment = await cachedAssignmentService.getAssignmentById(id);
  const data = {
      id: assignment.id,
      title: assignment.title,
      order: assignment.assignment_order,
      handout: assignment.handout
  }
  return Response.json(data);
};

const handleGetSizeOfAssignments = async (request) => {
  const size = await cachedAssignmentService.getQtyOfAssignments();
  return Response.json({ size: size });
};

export { getListOfAssignments, handleGetAssignment, handleGetSizeOfAssignments };