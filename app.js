const express = require('express');
const mongoose = require('mongoose');
const cookiePraser = require('cookie-parser');

const app = express();
//
//
//route 
const authRoute = require('./routes/authRoute');
// const postRoute = require('./routes/postRoute')

//
//
// middleware
app.use(express.json());
app.use(cookiePraser());
app.use('/api/auth', authRoute);
// app.use('/api/post', postRoute)

//
//
// connect to database
mongoose
  .connect('mongodb://localhost:27017/node')
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => console.log('Server is running at: http://localhost:3000'));
  })
  .catch((error) => {
    console.log("error", error);
  });

// route
app.get("/", (_, res) => {
  return res.redirect("/api/auth");
});
