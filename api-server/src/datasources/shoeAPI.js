const { DataSource } = require('apollo-datasource');
var knex = require('../database/knex');

const {logAndThrow} = require('../utils')

class ShoeAPI  extends DataSource{
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    _Shoes(){
        return knex('knex_shoes');
    }
      
    getAll(){
        return this._Shoes().select().catch(e=>{throw(e)}); 
    }
    
    getShoeByName(name){
        return this._Shoes().whereRaw(`LOWER(name) = ?`,[`${name.toLowerCase()}`]).catch(e=>{
            logAndThrow(e,'error in getting shoes by name')
        }); 
    }
    
    async updateTrueToSize(name,true_to_size){
        try{
            // Get Shoe from dB
            name=name.toLowerCase()
            let shoe = await this.getShoeByName(name)
            let {true_to_size_avg,count} = shoe[0]
            
            // Convert strings to Numbers
            true_to_size = Number(true_to_size)
            true_to_size_avg = Number(true_to_size_avg)
            count = Number(count)
    
            // Compute Average 
            let new_true_to_size_avg = ((true_to_size_avg*count)+true_to_size)/(count+1)
            count=count+1
    
            return this._Shoes()
            .returning(['name','id','true_to_size_avg'])
            .update({true_to_size_avg:`${new_true_to_size_avg}`,count:count})
            .whereRaw(`LOWER(name) = ?`,[`${name}`])
            .catch(e=>{throw(e)})
    
        } catch(e){
            logAndThrow(e,'error in updating true to size')
        }
    }
}

module.exports.ShoeAPI = ShoeAPI