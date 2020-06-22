const fs = require('fs');
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const { send } = require('process');

// Inicianado APP
const app = express();
app.use(express.json());
app.use(cors())

// Obtendo configurações do appsettings.json
let fileAppsettings = fs.readFileSync('appsetting.json');
let appsettings = JSON.parse(fileAppsettings);

// Iniciando banco MongoDB com mongoose
mongoose.connect(
    appsettings.database.stringConnection,
    appsettings.database.connectionOptions
);
requireDir('./src/models');

// Configure Swagger
const swaggerDocs = swaggerJsDoc(appsettings.swaggerOptions);
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.set("view-engine", "ejs")
// Rotas
app.use('/api', require('./src/routes'));

const port = appsettings.server.portNumber;

app.listen(port, () => {
    console.log(`running in http://localhost:${port}`)
})
