const express = require('express');
const app = express();
const mongoose = require('mongoose');


const cors = require('cors');
const bodyParser = require('body-parser');

//MiddleWare
app.use(cors());
app.use(bodyParser.json())

/*
//import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);
*/

//import book route
const booksRoute = require('./routes/books');
app.use('/books', booksRoute);

//import book route
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

//routes
app.get('/',(req,res)=>{
    res.send('We are on home for libraryTestV2');
});

//how to start listening to server


//connect to DB
mongoose.connect('mongodb://localhost:27017/v5_back_testing').then(()=>{
    console.log(`connected to DB!`);     
}).catch(error=>{
    console.log('Error: ', error.message);
})


//port to access express
app.listen(8000);