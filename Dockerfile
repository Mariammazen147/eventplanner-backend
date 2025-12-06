# Use lightweight Node.js base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend code
COPY . .

# Expose port 3000 (backend port)
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "dev"]