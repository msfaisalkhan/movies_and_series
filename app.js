var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req, res){
    var name = req.query.smovie;
    request("http://www.omdbapi.com/?s=" + name + "&apikey=thewdb",function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)   //**body is string in the JSON so we need to convert it into string using parse**/
            res.render("results", {data: data});
        }
    });
});

var post = process.env.port || 3000;
app.listen(post, function(){
    console.log("movie app is started at "+ post);
});