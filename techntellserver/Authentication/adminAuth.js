const express = require('express');
const base64url = require('base64url');
const opts = require('../Authentication/authenticate').opts;

module.exports.isAdmin = (req, res,next) => {
    if(req.headers.authorization){
        let payload = base64url.decode(req.headers.authorization.split('.')[1]);
        payload = JSON.parse(payload);
        

        if(payload.admin){
            next();
        }
        else{
            next(new Error('Not an admin user!!'));
        }
    }
    else{
        next(new Error('LogIn First!!'));
    }
}
