const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  res.setHeader("X-My-Name", "Charu kukreja");
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserByID(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
      return res.json({msg:"Success"});
}

async function handleCreateNewUser(req,res){
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
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    console.log("result", result);
    return res.status(201).json({ msg: "Success",id:result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserByID,
  handleDeleteUserById,
  handleCreateNewUser,
};
