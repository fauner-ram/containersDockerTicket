# Etapa de build
FROM node:18

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# 👇 Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia el resto del código fuente
COPY . .

# Exponer el puerto
EXPOSE 4200

# Comando para ejecutar la app
CMD ["ng", "serve", "--host", "0.0.0.0"]