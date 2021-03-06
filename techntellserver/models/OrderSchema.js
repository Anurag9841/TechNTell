const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    products:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    // orderDate:{
    //     type: Date,
    //     required: true
    // },
    // supplied:{
    //     type: Boolean,
    //     default:false
    // },
    // shippedDate:{
    //     type: Date,
    //     default:"",
    // },
    // shipperId:{
    //     type: mongoose.Types.ObjectId,
    //     ref: ''
    // },
    orderDetails: [{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail'
    }]
},{
    timestamps: true
})

var Orders = mongoose.model('Order',OrderSchema);
module.exports = Orders;