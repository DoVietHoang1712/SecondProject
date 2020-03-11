const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLE = require('express-ejs-layouts');

const app = express();
//View engine
app.set('views', path.join(__dirname+'views'));
app.set('view engine', 'ejs');
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLE);
//Router
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/user'));
// app.use('/books', require('./routes/book'));
// app.use('/authors', require('./routes/author'));

app.listen(3000, () => {
    console.log('Running...');
})
