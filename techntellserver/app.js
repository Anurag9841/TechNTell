var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport= require("passport");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require("./routes/dish");
var productsRouter = require("./routes/products");
var orderRouter = require("./routes/Order");
var OrderDetailRouter=require("./routes/orderDetails");
var categoryRouter = require("./routes/categoriesRouter");
var CommentRouter = require("./routes/commentRouter");
var cors = require('cors');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/products',productsRouter);
app.use('/orders',orderRouter);
app.use('/categories',categoryRouter);
app.use('/orderdetails',OrderDetailRouter);
app.use('/comments',CommentRouter);
const mongoose=require('mongoose');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

const url="mongodb://localhost:27017/rest";

const connect=mongoose.connect(url,{ useFindAndModify: false },{useNewUrlParser: true},{ useUnifiedTopology: true });

connect.then((db)=>{
  console.log("Connection established");
},(err)=>{console.log(err);});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
