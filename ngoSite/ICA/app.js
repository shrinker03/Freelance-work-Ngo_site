// Requiring assets //

var express = require("express");
var app = express();
var session = require('express-session');
const sgMail = require('@sendgrid/mail');
var flash = require("connect-flash");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Using assets // 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());

app.use(require("express-session")({
    secret: "Shivam",
    resave: false,
    saveUninitialized: false
}));



app.use(session()); // session middleware


app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Routes //

app.get("/", function(req, res){
    res.render("index");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/gallery", function(req, res){
    res.render("gallery");
});

app.get("/event", function(req, res){
    res.render("event");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.post("/contact", async (req, res) => {
    const msg = {
      to: 'shivamdamre913@gmail.com',
      from: 'shivamdamre913@gmail.com',
      subject: "From ICA- "+ "regarding- "+ req.body.subject + "- Sender name- " +req.body.name + "- email- " + req.body.email + "-",
      text: req.body.message,
      html: req.body.message
    };
    try {
        await sgMail.send(msg);
        req.flash("success", "Thank you for contacting us, we will come to you soon!");
        res.redirect("/contact");
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
        req.flash("error", "Sorry something went Wrong!");
        res.redirect("back");
      }
});


app.post("/contact1", async (req, res) => {
    const msg = {
      to: 'shivamdamre913@gmail.com',
      from: 'shivamdamre913@gmail.com',
      subject: "From ICA- "+ "regarding- "+ "Joining the NGO " + "- Sender name- " + req.body.name + "- email- " + req.body.email + "-",
      text: req.body.message,
      html: req.body.message
    };
    try {
        await sgMail.send(msg);
        req.flash("success", "Thank you for contacting us, we will come to you soon!");
        res.redirect("/");
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
        req.flash("error", "Sorry something went Wrong!");
        res.redirect("back");
      }
});




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("All set!");
});