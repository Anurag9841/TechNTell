var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const { authenticate } = require('../Authentication/authenticate');
const { isAdmin } = require('../Authentication/adminAuth');
var Comment = require('../models/comment');
var CommentRouter = express.Router();

CommentRouter.use(bodyParser.json())

CommentRouter.route('/')
.get((req,res,next)=>{
    Comment.find({})
    .populate("author")
    .then((comment)=>{
        res.statusCode=200;
        res.setHeader("content-type","application/json");
        res.json(comment);
    })
})

module.exports = CommentRouter;