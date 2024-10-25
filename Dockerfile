# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todo el proyecto en el contenedor
COPY . .

# Instala TypeScript y ts-node globalmente en el contenedor
RUN npm install -g typescript ts-node

# Comando por defecto que se ejecutará cuando se inicie el contenedor
CMD ["ts-node", "./Ejercicio.1/main.ts"]
