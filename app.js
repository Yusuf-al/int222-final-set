const express = require('express');
const bikeRouter = require('./allrout/bikeRouter');
const productRouter = require('./allrout/productRouter');
const morgan = require('morgan');
const appError = require('./utils/appError')
const globalErrHandle = require('./controller/errController');
const ReRouter = require('./allrout/reviewRout');
const viewRouter = require('./allrout/viewRouter');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'styles')));

app.use(expressLayout)
app.set('view engine', 'ejs');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//All Middlewar Rout



app.use('/', viewRouter);
app.use('/api/projectAssing/bikes', bikeRouter);
app.use('/api/projectAssing/all-products', productRouter);
app.use('/api/projectAssing/review', ReRouter);

//unhandl rout

app.all('*', (req, res, next) => {
    next(new appError('This Route is Invalid', 404));
});

app.use(globalErrHandle);



// app.get('/projectAssing/', (req, res) => {
//     res.send("The app is running successfully ")
// })

// app.get('/projectAssing/bike', (req, res) => {
//     res.send("This is bike list page");
// })

module.exports = app;