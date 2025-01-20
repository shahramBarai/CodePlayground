import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const getQtyOfAssignments = async () => {
  let result = await sql`SELECT COUNT(*) as count FROM programming_assignments;`;
  result = Number(result[0].count);
  if (isNaN(result)){
    result = 0;
    console.log("The number of assignments is not a valid number");
  } 
  return result;
};

const getAssignmentById = async (id) => {
  const result = await sql`SELECT * FROM programming_assignments WHERE id=${id};`;
  console.log(result);
  return result.length !== 0 ? result[0] : null;
};

export { findAll, getQtyOfAssignments, getAssignmentById };
