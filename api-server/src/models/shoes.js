const logger = require('pino')()
const {logAndThrow} = require('../utils')

var knex = require('../database/knex');
const { query } = require('express-validator')


function _Shoes() {
    return knex('knex_shoes');
}
  
const _getAll = async () => {
    return _Shoes().select().catch(e=>{throw(e)}); 
}

const _getShoeByName = (name) => {
    return _Shoes().whereRaw(`LOWER(name) = ?`,[`${name.toLowerCase()}`]).catch(e=>{
        logAndThrow(e,'error in getting shoes by name')
    }); 
}

const _updateTrueToSize = async(name,true_to_size) => {
    try{
        // Get Shoe from dB
        name=name.toLowerCase()
        let shoe = await _getShoeByName(name)
        let {true_to_size_avg,count} = shoe[0]
        
        // Convert strings to Numbers
        true_to_size = Number(true_to_size)
        true_to_size_avg = Number(true_to_size_avg)
        count = Number(count)

        // Compute Average 
        let new_true_to_size_avg = ((true_to_size_avg*count)+true_to_size)/(count+1)
        count=count+1

        return _Shoes()
        .returning(['name','id','true_to_size_avg'])
        .update({true_to_size_avg:`${new_true_to_size_avg}`,count:count+1})
        .whereRaw(`LOWER(name) = ?`,[`${name}`])
        .catch(e=>{throw(e)})

    } catch(e){
        logAndThrow(e,'error in updating true to size')
    }
}

const validate = (method) => {
    switch(method){
        case 'update_true_to_size': {
            return [
                // Check if shoe exists in dB
                // Hardcoded for now but can come from dB in future
                query('shoeName').exists()
                .matches(/(^yeezy$|^nike mag$)/i),
                query('true_to_size').exists()
                .matches(/\b([1-5])\b/)
            ]
        }
        case 'get_shoes_by_name': {
            return [
                // Check if shoe exists in dB
                // Hardcoded for now but can come from dB in future
                query('shoeName').exists()
                .matches(/(^yeezy$|^nike mag$)/i)
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
