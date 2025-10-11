# Stage 1: Build the Angular app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (caching npm install)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built Angular files from Stage 1
COPY --from=build /app/dist/spotlight-sarajevo-fe /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
