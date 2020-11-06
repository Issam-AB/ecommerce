const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
////var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

//** Import Router */
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/product');

//* Config App */
require('dotenv').config();
const app = express();

//* Db MongoDb */
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'))
  .catch(() => console.log('not connect to database'));
/*
    // const db = process.env.DATABASE;
    // mongoose.connect(db, {

    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true

    // }).then(() => console.log(`db connected in db ${db}`))
    //     .catch(() => console.error('not connect to database'));
*/

//* Midleware  */
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//** Route Midleware */
app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

// app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on port ${port}`));
