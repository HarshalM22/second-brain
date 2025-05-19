# Use official Node image with Alpine (lightweight)
FROM node:20-alpine3.18

# Set working directory
WORKDIR /app

# Install dependencies first (using separate layer for cache)
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the project using local tsc (via npx)
RUN npx tsc -b && npx vite build

# Expose default Vite preview port
EXPOSE 5173

# Run Vite dev server (or use preview if you want production)
CMD ["npm", "run", "dev"]
