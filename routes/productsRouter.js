const express = require('express');
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const router = express.Router();



router.post("/create",upload.single("image"), function (req,res){

    try{
        let { name, price, discount, bgColor, panelColor, textColor} = req.body;

    let product = productModel.create({
        image: req.file.buffer,
        price, discount, bgColor, panelColor, textColor
    });

    req.flash("success","Product created successfully");
    res.redirect('/owners/admin')
    }catch(err){
        res.send(err.message);
    }

})

module.exports = router;