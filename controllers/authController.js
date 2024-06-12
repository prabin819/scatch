const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req,res){
    try {
    
    let {email, password, fullName} = req.body;

    let user = await userModel.findOne({email})
    if(user){
        req.flash("error","You already have an account. Please log in.");
        return res.redirect('/');
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            if(err) return res.send(err.message);

            //res.send(hash);
            let user = await userModel.create({
                email,
                password:hash,
                fullName
            });

            
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("user created successfully");
        });
    });

    
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.loginUser = async function (req, res){

    let {email, password} = req.body;

    let user  = await userModel.findOne({email});

    if(!user) {
        req.flash("error","Email or password Incorrect.");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            req.flash("error","Email or password Incorrect.");
            return res.redirect("/");
        }
    })
}

module.exports.logout = function (req,res){
    res.cookie('token','');
    res.redirect('/');
}