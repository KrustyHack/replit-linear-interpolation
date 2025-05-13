FROM node:current-bullseye-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the application
RUN npm run build

# Expose the port that the server listens on
EXPOSE 5000

# Set environment variable to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]