# Backend Dockerfile
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the application's port
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/index.js"]
