const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); //for when we are creating new data

function readWarehouses() {
  const warehousesData = fs.readFileSync("./data/warehouses.json");
  const parsedWarehouses = JSON.parse(warehousesData);
  return parsedWarehouses;
}

function writeWarehouses(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/warehouses.json", stringifiedData);
}

//This route returns all warehouse data from the json data file to the user
router.get("/", (req, res) => {
  const warehouses = readWarehouses();

  const warehouseArr = warehouses.map((warehouse) => {
    return{
      id: warehouse.id,
      name: warehouse.name,
      address: warehouse.address,
      city: warehouse.city,
      country: warehouse.country,
      contact: {
        name: warehouse.contact.name,
        position: warehouse.contact.position,
        phone: warehouse.contact.phone,
        email: warehouse.contact.email
      }
    }
  })
  res.json(warehouseArr);
});



module.exports = router;