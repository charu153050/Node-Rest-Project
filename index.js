const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

//Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .post((req, res) => {
    //ToDo - Create new User
    return res.json({ status: "pending" });
  })
  .patch((req, res) => {
    //ToDo - Edit the user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //ToDo - Delete the user with id
    return res.json({ status: "pending" });
  });

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// app.post("/api/users", (req, res) => {
//   //ToDo - Create new User
//   return res.json({ status: "pending" });
// });
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
