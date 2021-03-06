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
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

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

// mongo store is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemoved: 'disabled'
        },
        function(err){
            console.log(err|| 'connect-mongodb setup ok');
        }
    )
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