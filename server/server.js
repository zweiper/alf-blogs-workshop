require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const {errorHandler} = require('./middleware/errorMiddleware');


connectDB();

app.unsubscribe(express.static('public'));

app.get('/AWS', (req, res) =>{
    res.status(200).json({message: 'Hello Guys!'});
})

//Post Routers:
const postRouters = require('./routers/postRouters');
app.use('/posts', postRouter)

app.use('errorHandler', errorHandler)

app.listen(8080, () =>{
    console.log('Server is running in port 8080');
})

//note: di ko nasundan first speaker, masyado mabilis T-T, re-watch ko na lang recording