
//require express to run the server
const express = require('express');
const app = express();

//require mongoose 
const mongoose = require('mongoose');

//connect to data base
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true, (not supported by Mongoose)
    //https://www.mongodb.com/community/forums/t/option-usecreateindex-is-not-supported/123048/4
    useUnifiedTopology: true
});

//db set as shortcut of mongoose.connection
const db = mongoose.connection;

//logic to check if there is an error
db.on("error", console.error.bind(console, "connection error:"));

//logic for succesfull connection
db.once("open", () => {
    console.log("Database connected");
});


//set the template engine to use
app.set('view engine', 'ejs');

//sets the path to views folder
const path = require('path');
app.set('views', path.join(__dirname, 'views'))


//request to localhost:3000/

app.get('/', (req, res) => {
    res.render("home") // "home" stands for home.ejs, not just a string
});

//new campground

//require model

const Campground = require('./models/campground');

//new url , camp created, saved to db and sent to browser

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: "cheap camping"});
    await camp.save();
    res.send(camp)
})


//set port listening

app.listen(3000, () => {
    console.log('Serving on port 3000')
})