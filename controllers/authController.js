const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req,res){
    try {
    
    let {email, password, fullName} = req.body;

    let user = await userModel.findOne({email})
    if(user) return res.status(401).send("You already have an account. Please log in");

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

    if(!user) return res.send("Email or password Incorrect");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("You can now login");
        }
        else{
            return res.send("Email or password Incorrect");
        }
    })
}