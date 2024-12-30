const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");

const majorPath = require("./router/major.js") ;
const minorPath = require("./router/minor.js") ;
const authorPath = require("./router/author.js") ;
const homePath = require("./router/home.js") ;
const ExpressError = require("./utils/ExpressError.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogs');
}

main()
.then((res) => {
    console.log("connection to database established");
})
.catch((err) => {
    console.log(err);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "assets")));

app.use(methodOverride('_method'));

app.use("/", homePath);
app.use("/majors", majorPath);
app.use("/minors", minorPath);
app.use("/authors", authorPath);

app.use((err, req, res, next) => {
    let {status=500, message="Something went wrong" } = err;
    console.log(err);
    res.render("Error.ejs", {status, message});
})

app.listen(port, ()=> {
    console.log("listening to port 8080");
});
