const express = require("express");
const mongoose = require('mongoose');

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

//* Midleware  */
app.use('/api/user', userRouter);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is running on port ${port}`));