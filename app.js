const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const albumRoutes = require('./routes/albums');
const userRoutes = require('./routes/user');

mongoose.connect(`mongodb+srv://LeonBoakye:${process.env.PASSWORD}@cluster0-l6zcb.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/albums', albumRoutes);
app.use('/user', userRoutes);


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







const port = process.env.PORT || 2402;
app.listen(port, () => {
    console.log(`Listening to requests on port: ${port}...`);
    
})