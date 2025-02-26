# Use uma imagem oficial do Node.js como base (versão específica para evitar problemas de compatibilidade)
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run lint

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
