const express = require('express');
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/", function (req,res){
    res.send("hey users");
})

router.post("/register", function (req,res){
    try {
    
    let {email, password, fullName} = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            if(err) return res.send(err.message);

            //res.send(hash);
            let user = await userModel.create({
                email,
                password:hash,
                fullName
            });

            
            let token = jwt.sign({email, id: user._id}, "secret123",{expiresIn:'1hr'})
            res.cookie("token", token);
            res.send("user created successfully");
        });
    });

    
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;