const router = require('express').Router(); //Crea objeto router
const productsController = require('../controllers/products.controllers') // importa el controlador

router.get('/', productsController.getProducts); // GET http://localhost:3000/api/products --> Todos los productos
router.post('/', productsController.createProduct); // POST http://localhost:3000/api/products --> Crear un nuevo producto
router.put('/', productsController.updateProduct); // PUT
router.delete('/', productsController.deleteProduct); // DELETE

module.exports = router; // exporta el objeto router