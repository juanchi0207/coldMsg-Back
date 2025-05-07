# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM node:20-alpine

# recibo build-args
ARG OPENAI_API_KEY
ARG PORT  
# los hago variables de entorno dentro de la imagen
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV PORT=${PORT}
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
CMD ["npm", "start"]
