const express = require('express'); //impoted express module
const path = require("path");
const app = express(); //app initialization
const mongoose = require('mongoose');
const boduparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true }); //Database named contactDance is made
const port = 8000; //app will run at port 8000

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //Set template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
            res.send("This item has been saved to the database");
        }).catch(() => {
            res.status(400).send("Item was not saved to the database")
        })
        // res.status(200).render('contact.pug');
});

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});