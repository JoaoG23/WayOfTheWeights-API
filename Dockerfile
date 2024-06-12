# Escolha a imagem base do Node.js
FROM joaog545/api-way-of-weights-image:latest

# Defina o diretório de trabalho no container
WORKDIR /dist

# Copie ambos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install
COPY . .

# Comando para iniciar sua aplicação
CMD npm run prod
