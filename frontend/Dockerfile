# Etapa de build
FROM node:18

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Instala Chromium y dependencias para headless
RUN apt-get update && \
    apt-get install -y chromium chromium-driver fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils --no-install-recommends

# 👇 Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia el resto del código fuente
COPY . .

# Crear explícitamente el directorio coverage con permisos abiertos
RUN mkdir -p /app/coverage && chmod 777 /app/coverage

# Exponer el puerto
EXPOSE 4200

# Comando para ejecutar la app
CMD ["ng", "serve", "--host", "0.0.0.0"]