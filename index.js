const { urlencoded } = require("express");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("mongo error", err);
  });

//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTittle: {
    type: String,
  },
  gender: {
    type: String,
  },
},{timestamps:true});

const User = mongoose.model("user", userSchema);

//Middleware - plugin
app.use(urlencoded({ extended: false }));

app.get("/users", async(req, res) => {
  const allDbUsers =await  User.find({})
  const html = `
      <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

//Routes
app.get("/api/users", async(req, res) => {
  const allDbUsers =await  User.find({})
  res.setHeader("X-My-Name", "Charu kukreja")
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user)return res.status(404).json({error:"user not found"})
    return res.json(user);
  })

  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
    return res.json({ status: "success" });
  })
  .delete(async(req, res) => {
    // const id = Number(req.params.id);
    // console.log(id);
    // const filteredUsers = users.filter((user) => {
    //   user.id !== id;
    // });
    // console.log(filteredUsers)
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg:"Success"});
  });

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

app.post("/api/users", async(req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_tittle
  ) {
    res.status(401).json({ msg: "All Fields are required" });
  }
  const result = await User.create({
    firstName : body.first_name,
    lastName:  body.last_name,
    email: body.email,
    gender :body.gender,
    jobTitle:body.job_title 
  })
  console.log("result",result)
  return res.status(201).json({msg:"Success"})
});
// app.patch("/api/users:id", (req, res) => {
//   //ToDo - Edit the user with id
//   return res.json({ status: "pending" });
// });
// app.delete("/api/users:id", (req, res) => {
//   //ToDo - Delete the user with id
//   return res.json({ status: "pending" });
// });

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
