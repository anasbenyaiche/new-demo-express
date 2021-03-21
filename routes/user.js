const express = require("express");
const router = express.Router();
const fs = require("fs");

let basePath = `${__dirname}/../user.json`;

const data = fs.readFileSync(basePath).toString();
const userList = JSON.parse(data);
// all our operation will be in this route "/users"

// get all user in json file
router.get("/", (req, res) => {
  res.send(data);
});

// add new user in json file
router.post("/", (req, res) => {
  // we get the body from request body
  const newUser = req.body;
  userList.push({ id: userList.length, ...newUser });
  // convert back to json to write the json file of user list
  const newFile = JSON.stringify(userList);
  fs.writeFile(basePath, newFile, (err, data) => {
    err
      ? console.error(err)
      : res.send({ message: "user add successfully", newUser });
  });
});

// find a user by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const targetUser = userList.find((user) => user.id === id);
  res.send({
    message: "user found",
    user: targetUser,
    count: targetUser.length,
  });
});

// delete a user
router.delete("/:id", (req, res) => {
  // extracting id from the request
  const { id } = req.params;
  // filter the user list where the id is the same of the id we send
  const filteredusers = userList.filter((user) => user.id != id);
  // converting
  const newFile = JSON.stringify(filteredusers);
  // writing the file
  fs.writeFile(basePath, newFile, (err, data) => {
    err ? console.error(err) : res.send({ message: "deleted successfully" });
  });
});
// update a user form the json file
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const targetUser = userList.find((user) => user.id === id);
  const newUserList = userList.map((user) => {
    if (user.id == targetUser.id) {
      return { ...updatedUser };
    } else return user;
  });
  const newFile = JSON.stringify(newUserList);
  fs.writeFile(basePath, newFile, (err, data) => {
    err ? console.error(err) : res.send({ message: "updated successfully" });
  });
});

module.exports = router;
