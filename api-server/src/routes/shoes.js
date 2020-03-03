const logger = require('pino')()

const express = require("express")
const router = express.Router()

const shoes = require('../models/shoes')


router.get("/", async (req, res, next) => {
    try {
        if(req.query.shoe){
            let shoe = await shoes.getShoeByName(req.query.shoe).catch(e=>{
                logger.info(e)
                throw(e)
            }) 
            res.send(shoe)
        }else{
            let shoes_list = await shoes.getAll().catch(e=>{
                logger.info(e)
                throw(e)
            }) 
            res.send(shoes_list)
        }
    } catch(err) {
        next(err)
    }
})

router.post("/true_to_size", async (req, res, next) => {
    try{
        let {name,true_to_size} = req.query
        let newAverage = await shoes.updateTrueToSize(name,true_to_size)
        res.send(newAverage)
    } catch(err) {
        next(err)
    }
})

module.exports = router