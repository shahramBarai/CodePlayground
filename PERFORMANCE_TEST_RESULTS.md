Here you can find performance tests written with k6 that are used to (1) measure job page loading performance and (2) measure job submission performance.

* Brief description of the used server: HTTP/1.1
* Brief description of my computer: 
    * Windows
    * Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
    * RAM 16GB

1. performance-test-get-assignment.js

        http_reqs:                  28365
        http_req_duration - avg:    1.74ms
        http_req_duration - p(99):  6.87ms


2. performance-test-post-submition.js

        http_reqs:                  9436
        http_req_duration - avg:    5.28ms
        http_req_duration - p(99):  13.82ms
