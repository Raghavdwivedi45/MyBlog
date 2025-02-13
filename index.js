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




// name: 'Demo',
// email: 'demo@gmail.com',
// dateOfBirth: ISODate('2025-02-03T00:00:00.000Z'),
// username: 'Demo',
// description: 'The anonymous demo author is a creative force whose work exists in a space defined by mystery and intrigue. Not bound by the constraints of personal fame or public recognition, this author prefers to let the work speak for itself. Their demos are often experimental, filled with innovative ideas that push the boundaries of their genre, captivating listeners with new textures, sounds, and rhythms. Whether working in electronic music, ambient soundscapes, or experimental pop, the anonymity allows the focus to remain solely on the artistry, free from the distractions of celebrity.\r\n' +
//   '\r\n' +
//   "The lack of identity sparks curiosity among fans and critics alike, fostering a sense of discovery as each track or demo is released. There's an allure in the unknown, a sense of connection that feels both intimate and impersonal at once. The author’s decision to stay out of the spotlight allows them to explore their craft without external pressures, creating work that feels raw and authentic. Their demos, whether complete or unfinished, invite listeners into a world of sonic exploration, each piece standing as a testament to their commitment to creativity and innovation in the world of music. Through their anonymity, the demo author challenges the expectations of fame and artistic ownership.",
// img: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
