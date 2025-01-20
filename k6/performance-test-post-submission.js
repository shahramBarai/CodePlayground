import http from "k6/http";
import { check } from "k6";

const url = "http://localhost:7800/api/assignment/submit";

var code = [
    `def hello(): return "Hello"`,
    `def hello(): return "Hello world!"`,
    'def sum(a, b): return a + b',
    `def hello(): return "Hi"`,
    `def hello(): return "Hi world!"`,
    'def sum(a, b): return a - b'
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const options = {
    duration: "5s",
    vus: 10,
    summaryTrendStats: ["avg", "p(99)"]
};

export default function () {

    const i = getRandomInt(1, 3);
    const j = getRandomInt(1, 6);
    
    const data = {
        code: code[j - 1],
        assignment_id: i,
        userUuid: "test_user_" + String(i),
    };
    
    let res = http.post(
        url, 
        JSON.stringify(data),
    );

    if (!res.body.includes('error')) {
        check(res, {
            'response code was 200': (res) => res.status === 200,
            'response has submission id': (res) => res.body.includes('id'),
            'response has submission status': (res) => res.body.includes('status'),
            'response has submission grader_feedback': (res) => res.body.includes('grader_feedback'),
        });
    } else {
        check(res, {
            'second immediate response code was 200': (res) => res.status === 200,
            'second immediate response must contain an error': (res) => res.body.includes('error'),
        });
    }
};