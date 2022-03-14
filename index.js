require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("./public"));

app.use(cors());

app.use(express.json());

const SERVER_PORT = process.env.PORT || 9000;

// Start up the app
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});
