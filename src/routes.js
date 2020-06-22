const express = require('express');
const multer = require("multer")
const routes = express.Router();

const CityController = require('./controllers/CityController');
const StretchController = require('./controllers/StretchController');

// Rota de teste
routes.get('/', (req, res) => {
    return res.send("Wellcome to Postal Router API!");
});

// Rotas para esquema de cidades
routes.get('/cities', CityController.index);
routes.get('/cities/:id', CityController.show);
routes.post('/cities', CityController.store);
routes.put('/cities/:id', CityController.update);
routes.delete('/cities/:id', CityController.destroy);

// Rotas para esquema de trechos
routes.get('/stretches', StretchController.index);
const upload = multer({ dest: "uploads/" })
routes.post('/stretches',upload.single("stretches"), StretchController.store);

routes.post('/posts',upload.single("posts"), StretchController.posts);


module.exports = routes;