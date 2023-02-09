// Note that order matters
const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
// use static files
app.use(express.static("./assets"));

// use express layouts
app.use(expressLayouts);
// extract styles and scripts from sub pages and the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// 
app.use(session({
    name: 'codeial',
    // change the secret key before deployment
    secret: 'somethingblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(__dirname);
    console.log(`Server is running at port: ${port}`);
});