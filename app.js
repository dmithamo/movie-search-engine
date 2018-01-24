// Import the express module to this app ...
// ...then run it and save it to a variable
var express = require("express");
var app = express();

// Import request module
var request = require("request");


// Set up global variable 'movies' to be reassigned as list of retrieved movies
var movies;

// Make request to OMDB API
query = "iron man"
var omdbUrl = "http://www.omdbapi.com/?&apikey=b9a1e8c8&y=2013&s=" + query
request(omdbUrl, function(error, response, body){
    if(!error && response.statusCode === 200){
        var jsonData = JSON.parse(body)
        movies = jsonData["Search"]
    }else{
        console.log("REPORT\n" + "--".repeat(20) + "\n" + "error: " + error + "statusCode: "+ response.statusCode)
    }
})


// Set default render engine as ejs
app.set("view engine", "ejs");

// The root route. Render Homepage
app.get("/", function(req, res){
    var title = "T-Nane's Movie Search Engine";
    res.render("homepage", {title:title, movies:movies});
})


// Handle faulty routes. render custom error page
app.get("*", function(req, res){
    var title = "404. Page Not Found";
    res.render("404", {title:title});
})

app.listen(3000, function(){
    console.log("Server is running...")
})

