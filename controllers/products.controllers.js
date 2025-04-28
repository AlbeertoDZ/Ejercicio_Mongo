const Product = require('../models/products.model');

// POPULATE EQUIVALENTE AL INNERJOIN

//GET http://localhost:3000/api/providers --> Todos los providers // mirar demo clase mongo ssr (get hecho)
const getProducts = async (req, res) => {
  try {
    let products = await Product.find({}, "-_id -__v").populate(
      "provider",
      "-_id -__v")
    //console.log(products);

    res.status(200).json(products); // [] con los authors encontradas
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

// CREATE http://localhost:3000/api/products --> Crear un nuevo producto 
// modificar (mirar demo clase mongo ssr)
const createProduct = async (req, res) => {
  console.log(req.body);

  try {
    const data = req.body;
    let answer = await new Product(data).save();
    res.status(201).json(answer);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
}

//PUT

const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await Product.findOneAndUpdate(
      { title: data.old_title },
      data,
      { new: true }
    );
    if(!product) {
      return res.status(404).json({ msj: "Producto no encontrado"})
    }

    res.status(200).json(product); //Respuesta de la API
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
}

// DELETE 

const deleteProduct = async (req, res) => {
  console.log(req.params)
  try {
    const data = req.params;
    let answer = await Product.findOneAndDelete(
      { title: data.title },
      data,
      { new: true }
    );
    res.status(200).json(answer);
  } catch {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
}

module.exports = {
  getProducts, // GET
  createProduct, // CREATE
  updateProduct,
  deleteProduct // DELETE
}
