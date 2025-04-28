const router  = require('express').Router();
const providersControllers = require('../controllers/providers.controllers')

router.get('/', providersControllers.getAllProvider); // GET http://localhost:3000/api/providers --> Todos los providers
router.post('/', providersControllers.createProvider); // POST http://localhost:3000/api/providers --> Crear un nuevo provider
router.put('/', providersControllers.updateProvider); // PUT http://localhost:3000/api/providers --> Modificar un provider
router.delete('/', providersControllers.deleteProvider); // DELETE http://localhost:3000/api/providers --> Borrar un provider

module.exports = router; // exporta el objeto router