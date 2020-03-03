const logger = require('pino')()
const {logAndThrow} = require('../utils')

var knex = require('../database/knex');
// const { check, oneOf, validationResult } = require('express-validator');
const { body, query } = require('express-validator')


function _Shoes() {
    return knex('knex_shoes');
}
  
const _getAll = async () => {
    return _Shoes().select().catch(e=>{throw(e)}); 
}

const _getShoeByName = (name) => {
    return _Shoes().whereRaw(`LOWER(name) = ?`,[`${name}`]).catch(e=>{
        logAndThrow(e,'error in getting shoes by name')
    }); 
}

const _updateTrueToSize = async(name,true_to_size) => {
    try{
        // Get Shoe from dB
        let shoe = await _getShoeByName(name)
        let {true_to_size_avg,count} = shoe[0]
        
        // Convert strings to Numbers
        true_to_size = Number(true_to_size)
        true_to_size_avg = Number(true_to_size_avg)
        count = Number(count)
    
        // Compute new average
        let new_true_to_size_avg = (true_to_size_avg*count+true_to_size)/(count+1)
        
        return _Shoes()
        .returning(['name','id','true_to_size_avg'])
        .update({true_to_size_avg:new_true_to_size_avg,count:count+1})
        .whereRaw(`LOWER(name) = ?`,[`${name}`])
        .catch(e=>{throw(e)})
    } catch(e){
        logAndThrow(e,'error in updating true to size')
    }
}

const validate = (method) => {
    switch(method){
        case 'updateTrueToSize': {
            return[
                    query('shoe').exists()
                    // Check if shoe exists in dB
                    // Hardcoded for now but can come from dB in future
                    .matches(['yeezy','nike mag']),
                    // .matches(/yeezy/i),
                    query('true_to_size').exists()
                    // .isInt()
                ]
        }
    }
}

module.exports = {
    getAll: _getAll,
    getShoeByName: _getShoeByName,
    updateTrueToSize: _updateTrueToSize,
    validate
};
