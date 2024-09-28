const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserByID,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)

  .patch(handleUpdateUserByID)
  .delete(
    handleDeleteUserById
    // const id = Number(req.params.id);
    // console.log(id);
    // const filteredUsers = users.filter((user) => {
    //   user.id !== id;
    // });
    // console.log(filteredUsers)
  );

// router.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

module.exports = router;
