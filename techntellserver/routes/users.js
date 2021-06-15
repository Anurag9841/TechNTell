var express = require('express');
var bodyParser=require("body-parser");
var User=require("../models/userSchema");
var router = express.Router();

router.use(bodyParser.json());

const passport = require('passport');
const password = require('../Authentication/password'); 
const authenticate = require('../Authentication/authenticate');
const isAdmin = require('../Authentication/adminAuth').isAdmin;


router.get('/',passport.authenticate('jwt', {session: false}),isAdmin, function(req, res, next) {
  console.log("Headers are here", req.headers)
  User.find({})
  .then((user) => {
    res.statusCode = 200;
    res.json(user);
  })
  .catch((err) => next(err));
})
router.post('/signup',(req, res, next) => {
	const saltAndHash = password.genSaltAndHash(req.body.password);

	const newUser = new User({
	fname: req.body.fname,
	lname: req.body.lname,
	username: req.body.username,
	email: req.body.email
	});
	
	newUser.salt = saltAndHash.salt;
	newUser.hash = saltAndHash.hash;

	newUser.save()
	.then((user) => {
		res.statusCode = 200;
		res.setHeader('content-type', 'application/json');
		res.json(user);
	}, (err) => next(err))
	.catch((err) => next(err));

})

router.post('/login', passport.authenticate('local'),(req, res, next) => {	
  res.statusCode = 200;
	const returned = authenticate.issueJwt(req.user);
  console.log(returned.token)
	res.json({token: returned.token, expiresIn: returned.expiresIn});
  }); 

/*router.post('/signup/admin', (req, res,next) => {
  User.push(req.body, req.body.password, (err, user) => {
    if(err){
      next(err);
    }
    else{
      user.admin = true;
      user.save()
      .then((user) => {
        res.statusCode = 200;
        res.json(user);
      }, (err) => next(err))
      .catch((err) => next(err));
    }
  })
})
*/

router.get('/logout', (req,res,next) => {
	req.logout();
	res.end('logged out!!');
});
module.exports = router;