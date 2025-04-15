FROM node:20-alpine AS base 

ENV CI=true

WORKDIR /usr/src/app

COPY scripts/package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./tsconfig.json
COPY scripts ./scripts

RUN npm install 

# Initialize the prisma client => creates a generated folder in 
RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "run", "prisma:migrate:deploy"]

