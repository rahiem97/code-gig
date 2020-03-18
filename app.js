const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Handle bars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//database
const database  = require('./config/database')


//Test DB
database.authenticate()
.then(()=> console.log('database Connected...'))
.catch(err => console.log('Error: ' + err))

//Index route
app.get('/', (req, res) => res.render("index", {layout:'landing'}))

//Gig routes
app.use('/gigs', require('./routes/gigs'));

const port  = 5000;
app.listen(port, console.log(`App listening on port ${port}`));