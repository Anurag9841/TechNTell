const express = require("express");
const orderDetailsRouter = express.Router();
const bodyParser = require("body-parser");
const OrdersDetails = require("../models/OrderDetailsSchema");
const authenticate = require("../Authentication/authenticate");
const { isAdmin } = require('../Authentication/adminAuth');
const OrderDetails = require("../models/OrderDetailsSchema");
const Orders = require("../models/OrderSchema");
const orderRouter = require("./Order");

orderDetailsRouter.use(bodyParser.json());

orderDetailsRouter.route("/")
.get(authenticate.verifyJson,(req,res,next)=>{
    OrdersDetails.find({})
    .populate("order")
    .then((orderDet)=>{
        Orders.find({})
        .populate("order.products")
        .then((order)=>{
            res.statusCode=200;
            res.setHeader('content-type',"applcation/json")
            res.json(orderDet)
        })
    },(err)=>next(err))
    .catch((err)=>next(err))
})
// .delete((req,res,next)=>{
//     OrdersDetails.remove({})
//     .then((order)=>{
//         res.statusCode=200;
//         res.setHeader("content-type","application/json");
//         res.json(order)
//     })
//     .catch((err)=>(err))
// })
orderDetailsRouter.route("/:orderDetId")
.get(authenticate.verifyJson,(req,res,next)=>{
    OrderDetails.findById(req.params.orderDetId)
    .populate("products")
    .then((order)=>{
        res.statusCode=200;
        res.setHeader("content-type","application/json");
        res.json(order)
    })
    .catch((err)=>(err))
})
// .delete(authenticate.verifyJson,(req,res,next)=>{
//     OrderDetails.findByIdAndRemove(req.params.orderDetId)
//     .then((orderDet)=>{
//         res.statusCode=200;
//         res.setHeader("content-type","application/json");
//         res.json(orderDet)
//     })
//     .catch((err)=>next(err))
// })
module.exports = orderDetailsRouter