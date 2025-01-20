
# Reflection
## Application Overview

This application is a scalable web platform designed for users to practice programming by completing assignments. It features a frontend interface for user interaction, a backend API for managing assignments and submissions, a grading service to evaluate submitted code, and a Redis-based queue for handling grading tasks efficiently.

## Key Design Decisions

1. The use of `Docker` and `Docker Compose` allows for easy replication and load balancing of services, particularly the `programming-api` and `grader-api`. This ensures high availability and fault tolerance.

2. The application is divided into multiple services, including `programming-api`, `grader-api`, and `programming-ui`, each responsible for a specific functionality. This modular approach enhances maintainability and scalability.

3. Submissions are processed asynchronously using a ___Redis queue___ (`grader`), ensuring that grading tasks do not block the main application flow. This design allows the system to handle a high volume of submissions without performance degradation.

4. Originally, the `grader-api` was set up as an API point. However, I modified it so that the `grader-api` now functions as a ___'task service'___ that is subscribed to the '__grader__' queue and continuously monitors it. When a new submission is added to the list, the `grader-api` immediately processes it and saves the result to the database. In scenarios where we have multiple `grader-api` services subscribed to the '__grader__' queue, the first `grader-api` service (i.e., client) to be served is the one that has been waiting for the longest time (as per the description of [blpop](https://redis.io/docs/latest/commands/blpop/)).

5. Implementing caching strategies using ___Redis___ to reduce database load and improve response times. The `nginx.prod.conf` includes caching configurations for the frontend to enhance performance.

6. The application uses ___short polling___ to update the submission status (see `codeEditor.svelte` component). This ensures that users receive real-time feedback on their assignment submissions without needing to refresh the page manually.

7. Comprehensive testing using ___Playwright___ for end-to-end scenarios and ___k6___ for performance testing to ensure the application meets performance standards under load.

8. The project structure and Docker configurationsn in `docker-compose.prod.yml` support continuous integration and deployment, ensuring that changes can be tested and deployed efficiently (profiles flag `migrate` for database migration and/or `e2e-testing` for end-to-end testing).

## Possible Improvements

* __Database Connection Pooling:__ Implementing a _connection pool_ for the _PostgreSQL_ database can significantly improve performance by reusing existing database connections rather than opening a new connection for each request. This can reduce latency and increase throughput.

* __Horizontal Scaling:__ Currently, the application deploys multiple replicas of `programming-api` and `grader-api`. Further improvements can be made by implementing dynamic scaling based on workload using _Kubernetes_, which would allow the application to scale automatically in response to demand.

* __Rate Limiting and Throttling:__ Implementing rate limiting to prevent abuse and ensure fair usage across all users. This can be achieved using middleware in the `programming-api` service to limit the number of requests a user can make in a given time period.

* __Enhanced Logging and Monitoring:__ Integrating more advanced logging and monitoring tools like Prometheus and Grafana can provide better insights into the application's performance and help identify bottlenecks more efficiently.

* __User Experience Improvements:__ While the application is functional further enhancements can be made to the user interface using advanced features of _TailwindCSS_ to provide a more engaging and intuitive user experience.