FROM node:18

WORKDIR /app

# Instala ts-node-dev globalmente
RUN npm install -g ts-node-dev

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
