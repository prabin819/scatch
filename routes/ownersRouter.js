const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

//console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {              //only one owner allowed
      return res
        .status(500)
        .send("You dont have permission to create a new owner.");
    }

    let {fullName, email, password} = req.body;

    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}

//console.log(process.env.NODE_ENV)  //checking process.env.NODE_ENV

router.get("/", function (req, res) {
  res.send("hey owners");
});

module.exports = router;
