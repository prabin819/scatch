const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const router = express.Router();


router
.get('/', function (req,res){
    let error = req.flash("error");
    res.render('index',{error})
})
.get('/shop',isLoggedIn, async function(req,res){
    let products = await productModel.find();
    res.render("shop",{products});
})

module.exports = router;