# Node baseada em Alpine Linux para ser mais leve
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta que o Next.js usa
EXPOSE 3000

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]