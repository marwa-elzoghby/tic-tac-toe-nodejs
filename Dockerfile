# Use a lightweight Node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (to leverage Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run the app
CMD ["node", "tic-tac-toe-server.js"]
