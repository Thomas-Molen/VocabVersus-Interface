# Create Node environment
FROM node:18-alpine as build
# Create app directory and set it as current dir
WORKDIR /app
# Copy the package.json and package-lock.json to working dir for installing modules
COPY package.json .
COPY package-lock.json .
# Install modules
RUN npm ci
# Copy web-app to working dir
COPY . .
# Build app
RUN npm run build

# Declare the base image for the final image
FROM nginx
# Copy the build output from the previous image to the nginx html dir
COPY --from=build /app/dist /usr/share/nginx/html
# Add nginx configuration to allow custom routing
COPY --from=build /app/vocabversus-nginx.conf /etc/nginx/conf.d/vocabversus-nginx.conf
