const express = require("express");
const mongoose = require('mongoose');
// var bodyParser = require('body-parser');
const expressValidator = require("express-validator")

//** Import Router */
const userRouter = require("./routes/users")

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
app.use(express.json());
//* Midleware  */


app.use('/api/user', userRouter);


// app.use(bodyParser.json());


// app.use(expressValidator());

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is running on port ${port}`));