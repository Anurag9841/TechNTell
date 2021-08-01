const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const validatePassword = require('../Authentication/password').validatePassword;

const Strategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username})
        .then((user) => {
            if (!user) return done(null, false);
            else if(user){
                const passwd = validatePassword(password, user.salt, user.hash);
                if(passwd)
                    return done(null, user);
                else
                    return done(null, false);
            }
            else{
                return done(err, null)
            }
            
        })
        .catch((err) => done(err));
    }
);

passport.use(Strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((userId, done) => {
    User.findById(userId) 
    .then((user) => {
        done(null, user);
    })
    .catch((err) => done(err));
})


///////////////////json web token////////////////////////////////////

// issuing json web token

privKey = fs.readFileSync(__dirname+'/id_rsa_priv.pem', 'utf-8');
exports.issueJwt = (user) => {
    const payload = {
        id: user._id,
        admin: user.admin,
        expiresIn: '1d'
    };
    console.log(payload.id);
    console.log(payload.admin);
    const token = jwt.sign(payload, privKey, {expiresIn: payload.expiresIn, algorithm: 'RS256'});

    return {
        token: 'Bearer ' + token,
        expiresIn: payload.expiresIn
    }
}

//retreiving json web token strategy

pubKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');

opts ={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = pubKey;
opts.algorithm = ['RS256'];

const strategyForJwt = new jwtStrategy(opts, (payload , done) =>{
    User.findOne({_id: payload.id})
    .then((user) => {
        if(!user) 
           return done(null, false);
        else{
            
            return done(null, user);
        }
    })
    .catch((err) => done(err))
})


passport.use(strategyForJwt);

module.exports.verifyJson = passport.authenticate('jwt', {session: false});