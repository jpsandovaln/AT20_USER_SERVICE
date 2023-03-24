#Pulling the node image from docker hub.
FROM node:18-alpine3.16

#The work route is established
WORKDIR /app

#Copying the package.json file to the current directory.
COPY package*.json ./

#Installing the dependencies of the project.
RUN npm install

#Copying the files from the current directory to the current directory.
COPY . .

#Exposing the port 5000 to the outside world.
EXPOSE 5000

#Running the command `npm start` in the container.
CMD ["npm", "start"]