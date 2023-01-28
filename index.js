const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
// use static files
app.use(express.static("./assets"));

// use express layouts
app.use(expressLayouts);
// extract styles and scripts from sub pages and the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes/index'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(__dirname);
    console.log(`Server is running at port: ${port}`);
})