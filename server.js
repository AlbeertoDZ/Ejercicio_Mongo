const express = require('express');
const cowsay = require('cowsay');
const app = express();
const port = 3000;

/*
// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
*/

// Rutas
const providersRoutes = require("./routes/providers.routes")
//console.log(providersRoutes)
const productsRoutes = require("./routes/products.routes")
//console.log(productsRoutes)

//GET http://localhost:3000/ ---> Ruta / La principal
app.get('/', (req, res) => {
    res,send("Hello World!")
})

app.use(express.json()); // Habilito recepción de JSON en servidor

//WEB
app.use('/api/products',productsRoutes);
app.use('/api/providers',providersRoutes)



// Para rutas no existentes
//app.use('*',error404);

app.listen(port, () => {
  console.log(
      cowsay.say({
          text: `Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`,
          e: "oO",
          T: "U "
      }))
})