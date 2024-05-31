FROM node:carbon

#metadata
LABEL maintainer='Nicole Linnarz <nicole.linnarz7558@stu.mtec.edu>'
LABEL cohort='cohort-18'
LABEL animal='tiger'
LABEL description = 'being able to create a Dockerfile, build an image on, and run the container from the image.'

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000 5050 8080

RUN npm install

CMD ["npm", "start"]
