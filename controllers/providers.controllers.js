const { log } = require("node:console");
const Provider = require("../models/providers.model");

//GET http://localhost:3000/api/providers --> Todos los providers
const getAllProvider = async (req, res) => {
    try {
        const provider = await Provider.find({})
        console.log(provider);
        
        if(provider.length === 0) {
            res.status(404).json({ msj: "No hay providers" });
            return;
        } else {
            res.status(200).json(provider); // Respuesta de la API para 1 provider
        }
        
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
      res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
  };


//CREATE

const createProvider = async (req , res) => {
    console.log(req.body);
    try {
        const data = req.body;
        let answer = await new Provider(data).save();
        res.status(201).json(answer);
    } catch(error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

//PUT

const updateProvider = async (req, res) => {

    try {
        const data = req.body;
        const provider = await Provider.findOneAndUpdate(
            { company_name: data.company_name },
              data ,
            { new: true }
        );
        res.status(200).json(provider); // Respuesta de la API para 1 provider
}   catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }

}

//DELETE

const deleteProvider = async (req, res) => {
    console.log(req.params);
    try {
        const data = req.params;
        let answer = await Provider.findOneAndDelete(
            { company_name: data.company_name },
              data ,
            { new: true }
        );
        res.status(200).json(answer);
    } catch (error){
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
    
}

module.exports = {
    getAllProvider, // GET
    createProvider, // CREATE (POST)
    updateProvider, // PUT
    deleteProvider, // DELETE
  }