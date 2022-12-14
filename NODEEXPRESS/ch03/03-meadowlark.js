const express = require("express");
const expressHandlebars = require("express-handlebars");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + "/public")); //__dirname 

// app.engine("handlebars", expressHandlebars({ defaultLayout: "main", }));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("home"));

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.get("/about", (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render("about", { fortune: randomFortune });
});
// custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render("404");
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render("500");
});