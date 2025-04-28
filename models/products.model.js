const mongoose = require('mongoose');
const Provider = require("./providers.model");
//const { type } = require('os');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "providers", //nombre del modelo de la coleccion de providers
        required: true
    }
});

// Crear el modelo --> Colección
const Product = mongoose.model('products', productSchema);

module.exports = Product;

// Crear producto pasando titulo + id de proveedor por parametro
async function createProduct(id, title, price, description, company_name) {
    try {
        const provider = await Product.findOne({ title: company_name });//Duda {}
        const provider_id = provider[0]._id.toString();

        // Crear el producto con el ID del proveedor
        const product = new Product({
            id,
            title,
            price,
            description,
            provider: provider_id
        });

        const result = await product.save();
        console.log("Producto creado: " + result);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}
/*
//Crear 1er producto
createProduct(
    1,
    "Tarta de queso",
    13,
    "La mejor tarta de Queso de Madrid",
    "Alex Cordobes"
);

//Crear 2o producto

createProduct(
    2,
    "Drop 004",
    90,
    "Huevo relleno de 22 creaciones unicas",
    "Sugar Papi"
)
*/

//PUT

async function updateProduct(title, price, description, provider, old_title){
    const product = await Product.findOne({title})
    if(product){
        product.title = title;
        product.price = price;
        product.description = description;
        product.provider = provider;
        product.old_title = old_title;
        const result = await product.save();
        console.log("Producto actualizado: " + result);
    } else {
        console.log("No existe el producto");
    }
}

// Delete 
async function deleteProduct(title) {
    const product = await Product.findOne({title});
    if(product){
        const result = await product.deleteOne();
        console.log("Se ha borrado el producto: " + result);
    } else {
        console.log("No existe el producto")
    }
}


