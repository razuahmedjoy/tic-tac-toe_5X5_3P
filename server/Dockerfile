FROM node:18-alpine

# Install required system libraries
RUN apk add --no-cache openssl openssl3 gcompat libc6-compat

# Create necessary symlinks
RUN ln -s /usr/lib/libssl.so.3 /usr/lib/libssl.so.1.1 && \
    ln -s /usr/lib/libcrypto.so.3 /usr/lib/libcrypto.so.1.1

WORKDIR /app

# 1. Copy package files first
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./


# 2. Install dependencies
RUN npm install
RUN npx prisma generate

COPY . .


RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
