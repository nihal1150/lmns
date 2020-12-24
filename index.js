const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3003;

// routes
const loanRoutes = require('./routes/loans');

// Method Override middleware
app.use(methodOverride('_method'));

// setting up the template engine as pug
app.set('view engine', 'pug');
app.set('views', 'views');


app.use(express.static('public'));

// Third Party Middleware

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/loans', loanRoutes);
app.use((req, res) => {
    res.render('add-loans');
});

app.use((req, res) => {
    res.render('page-not-found');
});


app.use((err, req, res, next) => {
    res.send('Server Error');
});

app.listen(port, () => {

console.log(`listening port ${port}`);
    
});