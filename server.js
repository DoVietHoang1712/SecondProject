const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLE = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();
//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLE);
app.use(methodOverride('_method'));
//Router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));
// app.use('/books', require('./routes/book'));
app.use('/authors', require('./routes/author'));
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Running...');
})
