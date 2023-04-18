# Create Node environment
FROM node:18-alpine
# Create app directory and set it as current dir
WORKDIR /app
# Copy the package.json and package-lock.json to working dir for installing modules
COPY package*.json .
# Install modules
RUN npm ci
# Copy web-app to working dir
COPY . .
# Expose web-app on port
EXPOSE 5173
# run the npm script to launch web-app
CMD ["npm", "run", "dev"]