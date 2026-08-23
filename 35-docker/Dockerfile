# we start with a give image, containg some linux OS + nodejs
FROM node:22-alpine

# we create a folder inside the new system, and we cd into it
WORKDIR /app

# i start with copying only the package.json and package-lock.json
# so i build dependencies first
COPY package*.json .

# now we want to install al dependencies
RUN npm install

# now i want to copy the source files to the image
# COPY {from which folder in the local machine} {to which folder on the new image}
COPY . .

# the last command will always describe what happens when an image
# is loaded into a container
ENTRYPOINT [ "node", "app.js" ]

# in order to build this image, we use a `docker build` command
# the syntax is:
# docker build . 
# this will build an image with a random name...
# docker build . -t {some tag}
# tag structrue is usually: {hub username}/{image name}:{image version}
# so to sum up, i would use this docker build command
# docker build . -t shaharsol/express-middleware-demo:1.0   


# docker run -d --name express-demo -p 3010:3000  shaharsol/express-middleware-demo:1.0
