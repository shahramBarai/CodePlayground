import { readable, writable } from "svelte/store";

let response; let jsonData;
let currentOrder = Number(localStorage.getItem("currentOrder"));

// Score
let score = Number(localStorage.getItem("score"));

// User id
let user = localStorage.getItem("userUuid");
if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
  currentOrder = 0;
  localStorage.setItem("currentOrder", "0");
  score = 0;
  localStorage.setItem("score", score);
}

// Assignment
response = await fetch(`/api/assignments`);
jsonData = await response.json();
const assignments = jsonData.assignments;

const userUuid = readable(user);
const orderNumber = writable(currentOrder);
const currentScore = writable(score);

// Set new assingmen order as currnet order
function setNewAssignementOrder(nextNum) {
  localStorage.setItem('currentOrder', String(nextNum));
  currentOrder = nextNum;
  score += 100;
  localStorage.setItem('score', score);
  currentScore.set(score);
};

export { 
  userUuid,
  currentScore, 
  orderNumber, 
  assignments, 
  setNewAssignementOrder, 
  currentOrder };