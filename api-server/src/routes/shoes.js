const express = require("express")
const router = express.Router()
const { validationResult } = require('express-validator');

const shoes = require('../models/shoes')

const {logAndThrow} = require('../utils')

router.get("/",shoes.validate('get_shoes_by_name'),async (req, res, next) => {
    try {
        const result = validationResult(req).array()
        if(result.length>0){
            // Dont access shoeName prior to validation
            let {shoeName} = req.query
            if(shoeName){
                return logAndThrow('result in get_shoes_by_name',result)
            } else{
                let shoes_list = await shoes.getAll().catch(logAndThrow) 
                res.send(shoes_list)
            }
        } else{
            let {shoeName} = req.query
            let shoe = await shoes.getShoeByName(shoeName).catch(logAndThrow) 
            res.send(shoe)
        }   
        
    } catch(err) {
        next(err)
    }
})

router.post("/true_to_size",shoes.validate('update_true_to_size'),async (req, res, next) => {
    try{
        const result = validationResult(req).array()
        if(result.length>0){
            return logAndThrow('validation error',result)
        }
        let {shoeName,true_to_size} = req.query
        let newAverage = await shoes.updateTrueToSize(shoeName,true_to_size)
        res.send(newAverage)
    } catch(err) {
        next(err)
    }
})

module.exports = router