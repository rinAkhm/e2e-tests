# UI tests system for DP 

## Quick start

### How build image framework
```
docker build -f docker/Dockerfile -t ui_tests:ui_tests_latest .
```
### Run build from docker-compose up
```
docker-compose -f docker/docker-compose.yml up
```

Run tests from your machine to browser chromium
```
npm test
```
