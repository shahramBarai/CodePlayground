import http from "k6/http";
import { check } from "k6";

export const options = {
    duration: "5s",
    vus: 10,
    summaryTrendStats: ["avg", "p(99)"]
};

export default function () {
    let res = http.get("http://localhost:7800/");

    check(res, {
        'response code was 200': (res) => res.status === 200,
        'response has assignment list': (res) => res.body.includes('assignments'),
    });
}