if(process.env.NODE_ENV!="production") {
    require("dotenv").config();
}

// https://articleverse.onrender.com
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
// const MongoStore = require('connect-mongo');

const passport = require("passport");
const LocalStrategy = require("passport-local");
const authorInfo = require("./models/authorInfo.js"); //author will first need to create the account to write. Other readers can read w/o signup

const majorPath = require("./routes/major.js") ;
const minorPath = require("./routes/minor.js") ;
const authorPath = require("./routes/author.js") ;
const homePath = require("./routes/home.js") ;

const dbURL = `${process.env.PART1}${process.env.ATLAS_PASS}${process.env.PART2}retryWrites=true&w=majority&appName=Cluster0`;

async function main() {
  await mongoose.connect(dbURL);
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

// const store = MongoStore.create({
//     mongoUrl : dbURL,
//     crypto : {
//         secret : process.env.mongoSecret
//     },
//     touchAfter : 24*3600
// })

// store.on("error", () => {
//     console.log("ERROR IN MONGO STORE : ", err);
// })

app.use(session({
                //  store,
                 secret: process.env.SESSION_SECRET,
                 resave: false,
                 saveUninitialized: false 
                }));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(authorInfo.authenticate()));
passport.serializeUser(authorInfo.serializeUser());
passport.deserializeUser(authorInfo.deserializeUser());



app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");

    if (req.path === '/favicon.ico') return next();

    res.locals.currUser = req.user;

    if(!req.isAuthenticated() && req.path !== '/authors/signup' && req.path!=="/authors/login") {
        if(req.cookies.redirected) res.clearCookie("redirected");
        res.cookie("redirected", req.originalUrl);
    }
    next();
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.use("/authors", authorPath);
app.use("/", homePath);
app.use("/majors", majorPath);
app.use("/minors", minorPath);

app.use((err, req, res, next) => {
    let {status=500, message="Something went wrong" } = err;
    res.render("Error", {status, message});
})

app.use("*", (req, res) => {
    res.render("Error", {status:404, message:"Page Not Found"});
})

app.listen(port, ()=> {
    console.log("listening to port 8080");
});


