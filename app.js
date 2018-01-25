// Import the express module to this app ...
// ...then run it and save it to a variable
var express = require("express");
var app = express();

// Import request module
var request = require("request");

// Set default render engine as ejs
app.set("view engine", "ejs");


// Use resources in 'public' folder
app.use(express.static("public"))


// The root route. Render Homepage
app.get("/", function(req, res){
    var title = "T8 Movies DB";
    res.render("homepage", {title:title});
})

app.get("/searchdb", function(req, res){
    var query = req.query.search;

    url = "http://www.omdbapi.com/?&apikey=b9a1e8c8&s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            var movieData = JSON.parse(body);
            var movieList = movieData["Search"];
            var resultsTitle = "This is What You Searched for";
            res.render("search-results", {searchTerm: query, title:resultsTitle, movies:movieList});
        }else{
            console.log(response.statusCode, error);
        }
    })
})


// Handle faulty routes. Render custom error page
app.get("*", function(req, res){
    var title = "404. Page Not Found";
    res.render("404", {title:title});
})

app.listen(3000, function(){
    console.log("Server is running...")
})

