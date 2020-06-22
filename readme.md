# Welcome to Postal Router
O Postal Router foi desenvolvido como API rest em NodeJS, e persistência em mongoDB virtualizado por docker.

## Bibliotecas utilizadas
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.9.19",
    "mongoose-paginate": "^5.0.3",
    "mongoose-validator": "^2.1.0",
    "require-dir": "^1.2.0",
    "swagger-jsdoc": "^4.0.0",
    "swagger-ui-express": "^4.1.4"


Para rodar a aplicação tenha instalado na maquina o **NodeJS**, **NPM** e o (docker ou mongoDB), durante o desenvolvimento foi utilizada uma instância de mogoDB em docker.

Na pasta do Postal-Router execute os abaixo:

## Comandos
    npm install

para rodar com instância do mongoDB em docker:
    docker pull mongo
    docker run --name mongoDB -p 27017:27017 -d mongo

Para inicializar a aplicação:
    npm run dev

## Operação
A aplicação por padrão roda em [http://localhost:3001/](http://localhost:3001/)
O swagger pode ser encontrado em [http://localhost:3001/api-docs](http://localhost:3001/api-docs) que contém toda documentação de operação.

