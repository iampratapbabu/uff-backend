const express = require('express');

const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = require('./app');

// configure cors
app.use(cors());



// configure dotEnv
dotEnv.config({path : './config.env'});
const hostname = process.env.LOCAL_HOST_NAME;
const port = process.env.LOCAL_PORT;

// connect to Mongo DB
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  });


app.listen(port, hostname, () => {
    console.log(`Server is started at http://${hostname}:${port}`);
});
