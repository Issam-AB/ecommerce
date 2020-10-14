const express = require("express");
const mongoose = require('mongoose');

//** Import Router */
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

//* Midleware  */
app.use('api/user', userRouter);

app.get('/', (req, res) => {
    res.send({
        message: "salam mes chere deeloppeur"
    });
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is running on port ${port}`));