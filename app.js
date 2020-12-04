//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose")
//*******************************setup**************************************
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
//********************************databases*************************************

const blogsSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogsSchema);

//*********************************get/post requests************************************
 app.get("/", function(req, res){
   res.render("home");
 });
 app.get("/gallery", function(req, res){
   res.render("gallery");
 });
 app.get("/blog", function(req, res){
   Blog.find({},function(err,blogs){
     res.render("blog",{
       blogs:blogs,
     });
   });

 });
 app.get("/contact", function(req, res){
   res.render("contact");
 });
 app.get("/compose", function(req, res){
   res.render("composeBlog");
 });

app.post("/compose",function(req,res){
  const blogTitle = req.body.blogTitle;
  const blogContent = req.body.blogContent;

  const blog = new Blog({
    title: blogTitle,
    content: blogContent,
  });

  blog.save(function(err){
    if(!err){
        res.redirect("/");
    }
});
});



 app.get("/contact", function(req, res){
   res.render("contact");
 });

 app.get("/blogs/:blogId", function(req, res){
   const blogId=req.params.blogId;

   Blog.findOne({_id:blogId},function(err,blog){
     if(!err){

       let blogTitle=blog.title;
       let blogContent=blog.content;

       res.render("blogPage",{
         title: blogTitle,
         content: blogContent,
       });
     }
   });
});

//*****************************************************************
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
