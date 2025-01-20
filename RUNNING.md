# Deployment and testing
Here you can find information about how to deploy and test the application locally using `Docker`, `Playwright` and `k6`.

## Deployment
The application has separate configurations for development (`docker-compose.yml`) and production (`docker-compose.prod.yml`) environments.

To run the application locally:

1. Ensure [Docker](https://docs.docker.com/get-docker/) is installed and running.
2. Unzip the provided project folder.
3. Navigate to the project directory and run 
- `docker build -t grader-image ./grader-image` to build grader image
- `docker-compose up` (or `docker-compose -f docker-compose.prod.yml up -d`) to build and start the application.
4. Access the application via http://localhost:7800/ in a web browser. 
5. To stop docker and close the application, use `ctrl + c` (or run `docker-compose down`).

## Testing
### End-to-end tests
The application has a set of automated end-to-end tests made using `Playwright`.

Automated end-to-end tests can be found under the `./e2e-playwright/tests` directory.

Run following command to execute the tests:

    docker-compose run --entrypoint=npx e2e-playwright playwright test

Also you can run end-to-end tests during docker compose `production` envorment build by adding flags `--profie e2e-testing`
    
    docker-compose -f docker-compose.prod.yml --prifile e2e-testing up -d

The result of the test will be shown in the terminal, something like this:

    Running 4 tests using 1 worker

    ✓  1 [e2e-headless-chromium] › tests/Simple_tests.spec.js:3:1 › Server responds with a page with the title 'Programming assignments' (531ms)
    ✓  2 [e2e-headless-chromium] › tests/Simple_tests.spec.js:8:1 › Creating a submission that fails the tests and checking the feedback on incorrect submission (3.2s)
    ✓  3 [e2e-headless-chromium] › tests/Simple_tests.spec.js:16:1 › Creating a submission that passes the tests and checking the notification on the correctness of the submission (3.1s)
    ✓  4 …mission that passes the tests, checking the notification on the correctness of the submission, moving to the next assignment, and checking that the assignment is a new one. (3.2s)

    4 passed (11.7s)

### Performance tests
To run the performance tests using [k6](https://k6.io/docs/get-started/installation/):

    cd k6
    k6 run performance-test-get-assignment.js
    k6 run performance-test-post-submission.js

The result of the test will be shown in the terminal. 

**My performance test results are documented in `../PERFORMANCE_TEST_RESULTS.md` file.
