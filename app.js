//jshint eversion:6

//Creating constants for packages to be used in our code
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

//Creating the const app using express framework
const app = express();

let items = [];
let workItems = [];

//Telling server to use ejs
app.set("view engine", "ejs");

//Using body-parser to grab information from the HTML body
app.use(bodyParser.urlencoded({extended: true}));


//Getting express to use our css files
app.use(express.static("public"));


//Get request
app.get("/", function(req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

//Post request
app.post("/", function(req, res){
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

//Getting work route
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

//Get request for the about page
app.get("/about", function(req,res) {
  res.render("about");
});

//Post request to work directory
app.post("/", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

//Setting up server on port 3000
app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
