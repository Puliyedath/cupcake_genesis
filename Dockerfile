# -- Base Builder Stage --
FROM node:20-alpine AS base 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run prisma:generate


# -- Development Stage --
FROM node:20-alpine AS development
WORKDIR /usr/src/app
ENV NODE_ENV=development
ENV CI=true

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run prisma:generate

EXPOSE 3000
CMD ["npm", "run", "dev"]

# -- Production Stage --    
FROM node:20-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV CI=true
COPY package*.json ./
RUN npm ci --only=production

# -- copy artifacts from base stage --
COPY --from=base /usr/src/app/build ./build
COPY --from=base /usr/src/app/public ./public
COPY --from=base /usr/src/app/prisma ./prisma
COPY --from=base /usr/src/app/server.js ./server.js

EXPOSE 3000
CMD ["npm", "run", "start"]

