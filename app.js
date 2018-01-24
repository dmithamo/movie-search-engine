// Import the express module to this app ...
// ...then run it and save it to a variable
var express = require("express");
var app = express();

// Set default render engine as ejs
app.set("view engine", "ejs");

// The root route. Render Homepage
app.get("/", function(req, res){
    var title = "T-Nane's Movie Search Engine";
    res.render("homepage", {title:title});
})


// Handle faulty routes. render custom error page
app.get("*", function(req, res){
    var title = "404. Page Not Found";
    res.render("404", {title:title});
})

app.listen(3000, function(){
    console.log("Server is running...")
})

