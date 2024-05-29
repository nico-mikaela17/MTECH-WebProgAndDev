# docker-lab

Simple node app.

## Build

1. Build the image:
   - `docker build -t docker-lab:latest .`
2. Run the image:
   - `docker run -d --name docker-lab -p 5050:5050 docker-lab:latest`
3. Test:
   - Browse to http://localhost:5050 in your favorite browser.
