const express = require("express");
const router = express.Router();
const fs = require("fs");

function readInventory() {
  const inventoryData = fs.readFileSync("./data/inventories.json");
  const parsedInventory = JSON.parse(inventoryData);
  return parsedInventory;
}

function writeInventory(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/inventories.json", stringifiedData);
}

module.exports = router;