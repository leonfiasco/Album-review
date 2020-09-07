const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const albumRoutes = require('./routes/albums');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGODB_URI || `mongodb://leonboakye:${process.env.PASSWORD}@ds035816.mlab.com:35816/heroku_rq0g67ck`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/albums', albumRoutes);
app.use('/users', userRoutes);


app.use((req, res, next) => {
    const error = new Error('The path you requested is not found');
    error.status = 400;
    next(error);
});

app.use((req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}


const port = process.env.PORT || 2402;
app.listen(port, () => {
    console.log(`Listening to requests on port: ${port}...`);
    
})