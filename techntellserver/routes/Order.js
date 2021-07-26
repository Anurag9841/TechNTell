const express = require("express");
const orderRouter = express.Router();
const bodyParser = require("body-parser");
const Products = require("../models/productSchema");
const Orders = require("../models/OrderSchema");
const OrderDetails = require("../models/OrderDetailsSchema");
const authenticate = require("../Authentication/authenticate");
const { isAdmin } = require('../Authentication/adminAuth');


orderRouter.use(bodyParser.json());

orderRouter.route("/")
.get(authenticate.verifyJson,(req,res,next)=>{
    Orders.find({customer:req.user._id})
    // Orders.findOne({customer:req.user._id})
    .populate("customer")
    .populate("orderDetails")
    .then((order)=>{
        //console.log(order.orderDetails._ObjectId)
        if(order.orderDetails){
            Orders.find()
            .populate("order.orderDetails.products")
            .then((order)=>{
                res.json("succeess");
            })
        }
        // if(order.customer==req.user._id){
        //     console.log(order.customer)
        // }
        // else{
        //     console.log("no user found")
        //     console.log(order.shippedDate)
        // }
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json')
        res.json(order);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
////////YO NAGARDA NI HUNCHA HOLA///////////////////////////////
// orderRouter.route("/:orderId")
// .get(authenticate.verifyJson,(req,res,next)=>{
//     Orders.findById(req.params.orderId)
//     .populate("customer")
//     .populate("orderDetails")
//     .then((order)=>{
//         res.statusCode=200;
//         res.setHeader('Content-Type', 'application/json')
//         res.json(order);
//     },(err)=>next(err))
//     .catch((err)=>next(err))
// })

orderRouter.route("/:orderId/orderDetails")
.get(authenticate.verifyJson,(req,res,next)=>{
    OrderDetails.find({})
    .populate("products")
    .then((order_det)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json')
        res.json(order_det);
    })
    .catch((err)=>next(err))
})
orderRouter.route("/:orderId/:orderDetailsId")
.put(authenticate.verifyJson,(req,res,next)=>{
    OrderDetails.findById(req.params.orderDetailsId)
    .then((order)=>{
        if(order!=null){
            if(req.body.quantity){
                order.quantity = req.body.quantity;
            }
            order.save()
            .then((order)=>{
                Orders.findById(req.params.orderId)
                .populate("customer")
                .populate("orderDetails")
                .then((order)=>{
                    if(order!=null){
                    order.orderDate=Date.now().toString();
                    if(req.body.to_be_suppliedDate){
                        order.to_be_suppliedDate = req.body.to_be_suppliedDate
                    }
                    if(isAdmin && req.body.shippedDate){
                        order.shippedDate = req.body.shippedDate
                    }
                    order.save()
                    .then((order)=>{
                        res.statusCode=200;
                        res.json(order)
                    },(err)=>next(err))
                    .catch((err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err));  
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
    },(err)=>next(err))
.catch((err)=>next(err))  
})
.delete(authenticate.verifyJson,(req,res,next)=>{
    OrderDetails.findByIdAndRemove(req.params.orderDetailsId)
    .then((order)=>{
        Orders.findByIdAndRemove(req.params.orderId)
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader("content-type","application/json")
            res.json(resp)
        },(err)=>next(err))
    })
    .catch((err)=>next(err))
})

module.exports = orderRouter