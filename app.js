const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const verifyUser = require('./middlewares/verifyUser.js');

//routes
const bookRoute = require('./routes/bookRoute.js');
const userRoute = require('./routes/userRoute.js');
const fileUploadRoute = require('./routes/fileUploadRoute.js');

const app = express();
const port = 3000;
const databaseName = 'book-world';
const urlDatabase = `mongodb://localhost:27017/${databaseName}`;

mongoose.connect(urlDatabase, {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({extended: false}));

//routing
app.use('/user', userRoute);
app.use(verifyUser.authentication);
app.use('/book', bookRoute);
app.use('/upload', fileUploadRoute);

app.listen(port, () => {
  console.log(`connected on the port ${port}`)
})