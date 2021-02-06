const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// setup database
const db = require('./config/mongoose');
//setup express session and session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy");


app.use(express.urlencoded());
//setup cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const { urlencoded } = require('express');

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract sstyles and script from subpages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine', 'ejs');
app.set('views','./views');


app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);

});