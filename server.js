const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception');
    process.exit(1);
});
const DB = process.env.DB;

mongoose.connect(DB).then(() => {
    console.log('connection Done')
});

console.log(app.get('env'));

const port = 3030;
const server = app.listen(port, () => {
    console.log(`Connection running at ${port}..`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('unhandle Rejection');
    server.close(() => {
        process.exit(1);
    });
});
