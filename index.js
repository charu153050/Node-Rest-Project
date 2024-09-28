const express = require("express");
const { connectMongoDb } = require("./connection");
const fs = require("fs");
const { urlencoded } = require("express");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>{console.log("Db Connected")})

//Middleware - plugin
app.use(urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
