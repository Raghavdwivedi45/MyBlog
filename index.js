const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const authorInfo = require("./models/authorInfo.js"); //author will first need to create the account to write. Other readers can read w/o signup

const majorPath = require("./routes/major.js") ;
const minorPath = require("./routes/minor.js") ;
const authorPath = require("./routes/author.js") ;
const homePath = require("./routes/home.js") ;

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

app.use(express.static(path.join(__dirname, "public/css/")));
app.use(express.static(path.join(__dirname, "public/js/")));
app.use(express.static(path.join(__dirname, "assets/")));

app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(session({secret: "mysupersecretstring",
                 resave: false,
                 saveUninitialized: true }));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(authorInfo.authenticate()));

passport.serializeUser(authorInfo.serializeUser());
passport.deserializeUser(authorInfo.deserializeUser());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.use("/", homePath);
app.use("/majors", majorPath);
app.use("/minors", minorPath);
app.use("/authors", authorPath);

app.use((err, req, res, next) => {
    let {status=500, message="Something went wrong" } = err;
    console.log(err);
    res.render("Error.ejs", {status, message});
})

app.use("*", (req, res) => {
    res.render("Error.ejs", {status:404, message:"Page Not Found"});
})

app.listen(port, ()=> {
    console.log("listening to port 8080");
});
