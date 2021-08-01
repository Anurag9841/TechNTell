const mongoose =require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;




var productsSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    noofitem: {
        type: Number,
        default:0
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments"
    }]
},
    { timestamps:true
});
//"name":"smartTv","description":"very good tv","image":"EMPTY","price":"20000"

var Products = mongoose.model('products',productsSchema);
module.exports=Products;