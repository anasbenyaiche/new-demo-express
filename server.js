const express = require("express");
const fs = require("fs");
const app = express();

// declarig routes
const userRoute = require("./routes/user");
// middleware
app.use(express.json());

// routes
app.use("/users", userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server is runnning on port ${PORT}`)
);
