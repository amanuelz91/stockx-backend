module.exports = {
    Query:{
        getAllShoes: async (_,args, {dataSources}) => {
            return dataSources.shoeAPI.getAll()
        },
        getShoeByName: async (_, {name}, { dataSources }) => {
            return await dataSources.shoeAPI.getShoeByName(name)
        },
    },
    Mutation:{
        updateTrueToSize: async (_,args,{ dataSources }) => {
            let res = await dataSources.shoeAPI.updateTrueToSize(args.input.name,args.input.true_to_size)
            if(res){
                return {success:true,shoe:res}
            }else{
                return{success:false}
            }
        }
    },
    TrueToSizeUpdateResponse:{
        shoe: async (res,_,args) => {
            if(res&&res.shoe){
                return res.shoe
            }
        }
    },
}