var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const { authenticate } = require('../Authentication/authenticate');
const { isAdmin } = require('../Authentication/adminAuth');
var Categories = require('../models/categoryModel');
var Products = require('../models/productSchema');
var CategoriesRouter = express.Router();

CategoriesRouter.use(bodyParser.json());

const capitalizeFirst = (text) => {
    return (text[0].toUpperCase()+text.slice(1))
}


CategoriesRouter.route('/')
.get((req, res, next) => {
    Categories.find({})
    .populate('products')
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(category);
    }, (err) =>next(err))
    .catch((err) => next(err));
})
.post(isAdmin,(req, res, next) => {
    Categories.create(req.body)
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err))
})
///////////////////////////////////////////////////////////////////////////

CategoriesRouter.route('/:categId')
.get((req,res, next) => {
    Categories.findOne({categoryName:(req.params.categId)})
    .populate('products')
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err))
})

////////////////// TO DELETE ALL THE PRODUCTS FROM THE PRODUCT DATABASE/////////////////////////////
CategoriesRouter.route('/:categId/products')
.get((req,res,next)=>{
    Categories.findOne({categoryName:(req.params.categId)})
    .populate("products")
    .then((category)=>{
        if(category!=null){
            Products.find({})
            .then((products)=>{
                if(products!=null){
                    res.status = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(products)
                }
                else{
                    res.statusCode = 404;
                    var err = new Error("Error category doesn't Exist");
                    next(err);
                }
            })
        }
        else{
            res.statusCode = 404;
            var err = new Error("Error category doesn't Exist");
            next(err);
        }
    })
})
.delete((req,res, next) => {
    Categories.findOne({categoryName: (req.params.categId)})
    .then((category) => {
        if(category!=null){
            console.log(category.products.length)
            for(i=0;i<category.products.length;i++){
                Products.findOneAndDelete({_id:category.products[i]})
                .then((product)=>{
                    if(product!=null){
                        res.json(product)
                    }
                    else{
                        res.statusCode = 404;
                        var err = new Error('Error: no product available to delete');
                        next(err);
                    }
                })
            }
            category.products=(category.products.splice(0,category.products.length))
            category.save()
            .then((category)=>{
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(category);
            },(err)=>next(err))
        }
        else{
            res.statusCode = 404;
            var err = new Error('Error: no such category available ');
            next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

//////////////////TO DELETE A CATEGORY AND PRODUCTS IN THE CATEGORY///////////////////////////
CategoriesRouter.route('/:categId')
.delete((req,res, next) => {
    Categories.findOne({categoryName: (req.params.categId)})
    .then((category) => {
        if(category!=null){
            console.log(category.products.length)
            for(i=0;i<category.products.length;i++){
                Products.findOneAndDelete({_id:category.products[i]})
                .then((product)=>{
                    res.json(product)
                },(err)=>next(err))
                .catch((err)=>next(err))}
            Categories.findOneAndDelete({categoryName:category.categoryName})
            .then((category)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json("successfully deleted category")
            },(err)=>next(err))
        }
        else{
            err= new Error('Category '+ "Not Found")
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
CategoriesRouter.route('/:categId/products')
// .get((req,res, next) => {
//     Categories.findById(req.params.categId)
//     .populate('products')
//     .then((category) => {
//         if (category != null){
//             res.statusCode = 200;
//             res.setHeader('content-type', 'application/json');
//             res.json(category.products);
//         }
//         else{
//             res.statusCode = 403;
//             const err = new Error('Category with id:'+req.params.categId+'doesnot exist');
//             next(err);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err))
// })
.post(isAdmin,(req,res, next) => {
    Categories.findOne({categoryName: (req.params.categId)})
    .then((category) => {
        if (category != null){
            Products.create(req.body)
            .then((product) => {
                // product.featured = (req.body.featured)? true:false
                category.products.push(product._id)
                category.save()
                .then((category) => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(category);
                })
                .catch((err) => next(err))
                
            },(err) => next(err))
            .catch((err) => next(err));
        }
        else{
            res.statusCode = 403;
            const err = new Error('Category with id:'+req.params.categId+' doesnot exist');
            next(err);

        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

CategoriesRouter.route('/:categId/products/:productId')
.get((req,res, next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        if(product != null){
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(product);
        }
        else{
            res.statusCode = 403;
            const err = new Error('Category with id:'+req.params.categId+' doesnot exist');
            next(err);
        }
    })
    .catch((err) => next(err))
})

/////////////TO DELETE PARTICULAR PRODUCT//////////////////////////////////////////
.delete((req,res, next) => {
    Categories.findById(req.params.categId)
    .then((category) => {
        if(category != null){
            console.log(category)
            const index = category.products.indexOf(req.params.productId);
            if (index > -1){
                Products.findByIdAndRemove(req.params.productId)
                .then((resp) => {
                    category.products.splice(index, 1)
                    category.save()
                    .then((category)=>{
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
module.exports = CategoriesRouter;