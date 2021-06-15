const mongoose =require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },        
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


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
    comments:[commentSchema]
},
    { timestamps:true
});
//"name":"smartTv","description":"very good tv","image":"EMPTY","price":"20000"

var Products = mongoose.model('products',productsSchema);
module.exports=Products;