const express = require('express');
const bikeRouter = require('./allrout/bikeRouter');
const productRouter = require('./allrout/productRouter');
const morgan = require('morgan');
const appError = require('./utils/appError')
const globalErrHandle = require('./controller/errController');
const ReRouter = require('./allrout/reviewRout');
const router = require('./allrout/viewRouter');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const flash = require('connect-flash');
const override = require('method-override');
const path = require('path')


const app = express();
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'styles')));

app.use(expressLayout)
app.set('view engine', 'ejs');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: process.env.JWT_SECRET,
    cookie: { maxAge: 600 },
    resave: false,
    saveUninitialized: false
    
}));

app.use(flash());
app.use(override('_method'));



//All Middlewar Rout



app.use('/', router);
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