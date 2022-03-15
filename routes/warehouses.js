const express = require("express");
const router = express.Router();
const fs = require("fs");

function readWarehouses() {
  const warehousesData = fs.readFileSync("./data/warehouses.json");
  const parsedWarehouses = JSON.parse(warehousesData);
  return parsedWarehouses;
}

function writeWarehouses(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/warehouses.json", stringifiedData);
}

router.get('/:id', (req, res) => {
  const warehouses = readWarehouses();
  const individualWarehouse = warehouses.find((warehouse) => warehouse.id === req.params.id);
  if (!individualWarehouse) {
    return res.status(404).send('Warehouse not found');
  }
  res.json(individualWarehouse);
});

module.exports = router;