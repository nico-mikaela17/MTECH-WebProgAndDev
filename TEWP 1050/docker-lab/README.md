# docker-lab

Simple node app.

## Build

1. Build the image:
   - `docker build -t docker-lab:latest .`
2. Run the image:
   - `docker run -d --name docker-lab -p 5050:5050 docker-lab:latest`
3. Test:
   - Browse to http://localhost:3000 in your favorite browser.

## Deploy
1. Deploy your stack:
   - `docker stack deploy -c docker-compose.yaml  myapp-stack`
2. Scale out your first stack to 7 instances/replicas
   -`docker service scale myapp-stack_mywebsite=7`
3. Scale in your first stack to 2 instances/replicas
   -`docker service scale myapp-stack_mywebsite=2`
4. Remove your stack and delete your containers
   -`docker stack rm myapp-stack`

