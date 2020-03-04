require('dotenv').config()

const logger = require('pino')()
const PORT = require('./utils').returnPort()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
    next();
  });

app.use("/", routes)
app.get('/', (req, res) => {
    res.json({"message": "StockX API default endpoint"})
})

// Prevents spinning up of new process when testing in watch mode
if(!module.parent){
    app.listen(PORT, () => {
        logger.info("Server is listening on port", PORT)
    })
}
 
module.exports = app