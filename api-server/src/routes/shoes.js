const {logAndThrow} = require('../utils')

const express = require("express")
const { validationResult } = require('express-validator');
const router = express.Router()

const shoes = require('../models/shoes')

router.get("/", async (req, res, next) => {
    try {
        shoes.validate('getShoes')
        if(req.query.shoe){
            let shoe = await shoes.getShoeByName(req.query.shoe).catch(logAndThrow) 
            res.send(shoe)
        }else{
            let shoes_list = await shoes.getAll().catch(logAndThrow) 
            res.send(shoes_list)
        }
    } catch(err) {
        next(err)
    }
})

router.post("/true_to_size", async (req, res, next) => {
    try{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            logAndThrow()
        }
        let {name,true_to_size} = req.query
        let newAverage = await shoes.updateTrueToSize(name,true_to_size)
        res.send(newAverage)
    } catch(err) {
        next(err)
    }
})

module.exports = router