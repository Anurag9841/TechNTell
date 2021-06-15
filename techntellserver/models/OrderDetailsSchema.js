const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const OrderDetailsSchema = new Schema({
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    }],
    quantity:{
        type: Number,
        required: true
    },
    // Discount:{
    //     type: Currency,
    //     min: 0,
    //     default:10
    // }
},{
    timestamps: false
});

var OrderDetails = mongoose.model('OrderDetail', OrderDetailsSchema);
module.exports = OrderDetails;