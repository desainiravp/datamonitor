# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install prom-client
# Copy the rest of the application files to the working directory
COPY app/ ./

# Expose port 9091 to allow external access
EXPOSE 9091 9100

# Start the Node.js application
CMD ["node", "server.js"]
