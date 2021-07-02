const express=require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');

const Comments = require("../models/comment");
const Orders = require("../models/OrderSchema");
const Products = require('../models/productSchema');
const OrderDetails = require("../models/OrderDetailsSchema");
const Users = require("../models/userSchema");
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
    .populate("comments")
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
    Products.findById(req.params.productId)
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

productsRouter.route("/:productId/comments")
.post(authenticate.verifyJson,(req,res,next)=>{
    Products.findById(req.params.productId)
    .then((product)=>{
        if(product!=null){
            Users.findById(req.user._id)
            .then((user)=>{
                var comment = new Comments({
                    rating:req.body.rating,
                    comment:req.body.comment,
                    author:user.fname
                })
                comment.save()
                .then((comment)=>{
                product.comments.push(comment._id)
                product.save()
                .then((product)=>{
                    res.statuscode=200;
                    res.setHeader("content-type","application/json")
                    res.json(product)
                })
            .catch((err) => next(err))
        },(err) => next(err))
    })
        .catch((err) => next(err));
        }
        else{
            res.statusCode = 403;
            const err = new Error('Product with id:'+req.params.productId+' doesnot exist');
            next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

.delete(authenticate.verifyJson, isAdmin,(req,res, next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        if(product!=null){
            for(i=0;i<product.comments.length;i++){
                Comments.findOneAndDelete({_id:product.comments[i]})
                .then((comment)=>{
                    if(comment!=null){
                        res.json("Successfully deleted!!!"+ comment)
                    }
                    else{
                        res.statusCode = 404;
                        var err = new Error('Error: no product available to delete');
                        next(err);
                    }
                })
            }
            product.save((product.comments.splice(0,product.comments.length)))
            .then((product)=>{
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(product);
            },(err)=>next(err))
        }
        else{
            res.statusCode = 404;
            var err = new Error('Error: no such product available ');
            next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

productsRouter.route("/:productId/comments/:commentId")
.delete((req,res, next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        if(product != null){
            console.log(product)
            const index = product.comments.indexOf(req.params.commentId);
            if (index > -1){
                Comments.findByIdAndRemove(req.params.commentId)
                .then((resp) => {
                    product.comments.splice(index, 1)
                    product.save()
                    .then((prodcut)=>{
                        res.statusCode = 200;
                        res.setHeader('content-type', 'application/json');
                        res.json("Deletion Successful");
                    },(err)=>next(err))
                    .catch((err)=>next(err))
                })
                .catch((err) => next(err));
            }
            else{
                res.statusCode = 404;
                var err = new Error('Error: no such product id in the category ' + category.categoryName);
                next(err);
            }
        }
        else{
            //category is null
            res.statusCode = 404;
            var err = new Error('Error: no such product id in the ');
            next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err)) 
})
module.exports= productsRouter;