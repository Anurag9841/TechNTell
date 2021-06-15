const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const CategorySchema = new Schema({
    categoryName:{
        type: String,
        required: true,
        unique: true
    },
    // description:{
    //     type: String,
    //     required: true,
    // },
    // image:{
    //     type: String,
    //     required: true,
    // },    
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    }]
}, 
{
    timestamps: true
})

var Categories = mongoose.model('Category', CategorySchema)
module.exports = Categories;
