const express=require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');

const Orders = require("../models/OrderSchema")
const Products = require('../models/productSchema');
const OrderDetails = require("../models/OrderDetailsSchema");
const productsRouter=express.Router();
const authenticate = require("../Authentication/authenticate");
const { isAdmin } = require('../Authentication/adminAuth');

productsRouter.use(bodyParser.json());
const capitalizeFirst = (text) => {
    return (text[0].toUpperCase()+text.slice(1))
}

productsRouter.route('/')
.get((req,res,next)=>{
    Products.find({})
    .then((products)=>{
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyJson,isAdmin,(req, res, next) => {
    res.statusCode=403;
    res.end("post operation not allowed here");
})
productsRouter.route("/:productId")
.get((req,res,next)=>{
    Products.findOne(req.params.productId)
    .then((product)=>{
        res.statusCode=200;
        res.setHeader('Content-Type',"application/json");
        res.json(product);
    },  (err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyJson,(req,res,next)=>{
    var order = new OrderDetails({
        //orderDate: Date.now(),
        products:req.params.productId,
        quantity:req.body.quantity,
        //customer : req.user._id,
        //to_be_suppliedDate:req.body.to_be_suppliedDate,
        //shippedDate: req.body.shippedDate
    })
    order.save()
    .then((order)=>{
        var order2 = new Orders({
            customer : req.user._id,
            orderDate: Date.now().toString(),
            to_be_suppliedDate:req.body.to_be_suppliedDate,
            shippedDate: req.body.shippedDate,
            orderDetails:order._id
        })
        order2.save()
        //OrderDetails.findById(order._id)
        .then((order)=>{
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            res.json(order);
        },(err)=>next(err))
        }) 
    .catch((err)=>next(err))
})
.put(isAdmin,(req,res,next)=>{
    Products.findByIdAndUpdate((req.params.productId))
    .then((product)=>{
        if(req.body.price!=null) {product.price=req.body.price};
        if(req.body.noofitem!=null) {product.noofitem=req.body.noofitem};
        if(req.body.image!=null) {product.image=req.body.image};
        if(req.body.featured!=null) {product.featured=req.body.featured};
        if(req.body.name!=null) {product.name=req.body.name};
        if(req.body.description!=null) {product.description=req.body.description};
        product.save()
        .then((product)=>{
            res.statusCode=200;
            res.setHeader("content-type","application/json")
            res.json(product);
        },(err)=>next(err))
    })
    .catch((err)=>next(err))
})
module.exports= productsRouter;