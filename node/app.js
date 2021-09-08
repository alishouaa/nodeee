const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});


const authRoute = require('./routes/auth')

const app = express();




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'react/build')));

app.use('/api', authRoute);
app.use(express.static('uploads'));


// 
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    const { succes } = error;
    res.status(status).json({ message, data, succes }).sendfile(Path.join(__dirname, 'react/build', 'index.html'));
  });
  
  
  const port = 3000

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})
    

module.exports = app;
