const express = require("express");
const mongoose = require('mongoose');
// var bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const cookieParser = require('cookie-parser')

//** Import Router */
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user")

//* Config App */
require("dotenv").config();
const app = express();

//* Db MongoDb */
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected'))
    .catch(() => console.log('not connect to database'))

// const db = process.env.DATABASE;
// mongoose.connect(db, {

//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true

// }).then(() => console.log(`db connected in db ${db}`))
//     .catch(() => console.error('not connect to database'));

//* Midleware  */
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

//** Route Midleware */
app.use('/api', authRouter);
app.use('/api', userRouter);


// app.use(bodyParser.json());


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is running on port ${port}`));