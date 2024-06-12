const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const expressSession = require("express-session");
const flash = require('connect-flash');

const db = require('./config/mongoose-connection');  //only "require" required (no calling)-----from part-3
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(expressSession({
    secret:process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000);