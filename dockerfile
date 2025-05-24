# Use the official Node.js runtime as the base image
# This provides a complete Node.js environment
FROM node:18-alpine

# Set the working directory inside the container
# All subsequent commands will be run from this directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# This is done before copying the rest of the code to leverage Docker's layer caching
# If dependencies haven't changed, Docker can reuse the cached layer
COPY package*.json ./

# Install dependencies
# npm ci is faster and more reliable for production builds than npm install
RUN npm install

# Copy the rest of the application code
# This is done after installing dependencies to optimize caching
COPY . .

# Create a non-root user for security
# Running containers as root is a security risk
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Create necessary directories and set permissions
RUN mkdir -p /app/logs && \
    chown -R nodejs:nodejs /app

# Switch to the non-root user
USER nodejs

# Expose the port the app runs on
# This doesn't actually publish the port, but documents which port the container uses
EXPOSE 3000

# Add health check
# Docker will periodically check if the container is healthy
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Define the command to run the application
# CMD is the default command executed when the container starts
CMD ["npm", "start"]