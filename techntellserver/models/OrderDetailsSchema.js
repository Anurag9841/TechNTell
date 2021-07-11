const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const OrderDetailsSchema = new Schema({
    orderDate:{
        type: Date,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    shipped:{
        type: Boolean,
        default:false
    },
    totalPrice:{
        type: Currency,
        required: true,
        min: 0 
    }
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