# CodePlayground

_\*This project is part of Aalto University's Designing and Building Scalable Web Applications course (completed in spring 2024)._

This project is a web application designed to assist users in practicing programming. It provides programming assignments, a code editor, and an automated grading system. Users can submit their code for evaluation and receive real-time feedback. The application is built with scalability in mind, incorporating multiple servers, load balancing, caching, and more.

## Features

- **Database:** Stores submissions in a `Postgres` database and avoids regrading identical submissions.
- **Message queue:** Uses `Redis list` to manage grading requests and processes them one by one.
- **Real-time communication:** Users receive real-time updates on their submission status without needing to refresh the page (`short polling`).
- **End-to-End Tests:** Written with `Playwright` to ensure the application works as expected.
- **Performance Tests:** Written with `k6` to measure and optimize application performance.
- **User Points System:** Tracks and displays user progress based on completed assignments.
- **Load Balancing for Grader API:** Supports multiple grader deployments to handle submissions efficiently by using `NGINX`.
- **Caching:** Implements caching mechanisms to improve performance by using `Redis`.
- **Styling:** Uses `TailwindCSS` for a consistent and user-friendly interface.
- Also Separate configurations for **development** and **production** environments.

## Project structure

    ├── e2e-playwright
    │   └── tests                # End-to-end tests for the application
    ├── flyway
    │   └── sql                  # Database migration scripts
    ├── grader-api
    │   ├── database             # Database interaction for the grader API
    │   └── services             # Services related to grading
    ├── grader-image
    │   └── example-test-code    # Example test code for the grader
    ├── k6                       # Performance testing scripts
    ├── nginx                    # Configuration for the NGINX server
    ├── programming-api
    │   ├── controllers          # API controllers for handling requests
    │   ├── database             # Database interaction for the programming API
    │   ├── services             # Services related to programming assignments
    │   └── util                 # Utility functions (caching and sendind to queue)
    ├── programming-ui           # User interface (Astro, Svelte and Tailwind)
    └── redis                    # Redis configuration

## Deployment and testing

\*\*Instructions about deployment and testing the application locally are in the `./RUNNING.md` file.

## Reflection

See `REFLECTION.md` for a brief description of the application, key design decisions, and potential improvements for performance.
