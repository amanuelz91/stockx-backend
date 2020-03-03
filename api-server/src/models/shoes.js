var knex = require('../database/knex');
const logger = require('pino')()


function _Shoes() {
    return knex('knex_shoes');
}
  
const _getAll = async () => {
    return _Shoes().select().catch(e=>{throw(e)}); 
}

const _getShoeByName = (name) => {
    return _Shoes().whereRaw(`LOWER(name) = ?`,[`${name}`]).catch(e=>{
        logger.info('error in getting shoes by name',e)
        throw(e)
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
        logger.info('error in updating true to size ',e)
        throw(e)
    }
}

module.exports = {
    getAll: _getAll,
    getShoeByName: _getShoeByName,
    updateTrueToSize: _updateTrueToSize
};
