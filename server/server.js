require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');

//connecting to database
connectDb();

//server static files from the directory
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello, AWSCC!'});
})

//Post Routers:
const postRouter = require('./routers/postRouters');
app.use('/posts', postRouter)

app.use(errorHandler)

//port is the code that run in local host
//listen(port code, callback function)
app.listen(8080, () => {
    console.log('Server is runnning on port 8080');
})
