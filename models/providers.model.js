const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    CIF: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    url_web: {
        type: String,
        required: true,
        validate: {
            validator: function(url){
                if(url.indexOf('http') != -1)
                    return true;
                else {
                    return false;
                }
            },
            message: "Introduzca una URL valida"
        }
    }
};


// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

//      Create (POST)
async function createProvider(company_name, CIF, address, url_web) {
    const provider = new Product({
        company_name,
        CIF,
        address,
        url_web
        });
    const result = await provider.save();
    console.log("Se ha creado el proveedor" + result);
}

//PUT

async function updateProvider(company_name, CIF, address, url_web){
    const provider = await Provider.findOne({company_name});
    if (provider){
        provider.company_name = company_name;
        provider.cif = CIF;
        provider.address = address;
        provider.url_web = url_web;
        const result = await provider.save();
        console.log("Proveedor actualizado: " + result);
    } else {
        console.log("No existe el proveedor");
    }
}

//Delete
async function deleteProvider(company_name) {
    const provider = await Provider.findOne({company_name});
    if(provider){
        const result = await provider.deleteOne();
        console.log("Se ha borrado el proveedor: " + result);
    } else {
        console.log("No existe el proveedor");
    }
}

/*
//Insertar 1er proovedor
const p = new Provider({
    company_name: "Sugar Papi",
    CIF: "B12345678",
    address: "Calle Cienflores 33",
    url_web: "https://sugarpapi.es"
})

//Guardar 1er proovedor

p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))

//Insertar 2o proovedor
const p2 = new Provider({
    company_name: "Alex Cordobes",
    CIF: "B98765432",
    address: "Calle Velazquez 60",
    url_web: "https://alexcordobes.es"
})

//Guardar 2o proovedor
p2.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))
*/