const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// setup database
const db = require('./config/mongoose');

app.use(expressLayouts);
app.use(express.static('./assets'));

//extract sstyles and script from subpages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use express router
app.use('/',require('./routes'));


app.set('view engine', 'ejs');
app.set('views','./views');






app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);

});