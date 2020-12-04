//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose")
//*********************************************************************
const app=express()
mongoose.connect("mongodb://localhost:27017/biscuitDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//*********************************************************************
 app.get("/", function(req, res){
   res.render("home");
 });
 app.get("/gallery", function(req, res){
   res.render("gallery");
 });
 app.get("/blog", function(req, res){
   res.render("blog");
 });
 app.get("/contact", function(req, res){
   res.render("contact");
 });

//*****************************************************************
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
