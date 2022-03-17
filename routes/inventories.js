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

//This route returns the inventory items across all warehouses
router.get("/", (req, res) => {
  const inventories = readInventory();

  const inventoryArr = inventories.map((inventory) => {
    return{
      id: inventory.id,
      itemName: inventory.itemName,
      description: inventory.description,
      warehouseName: inventory.warehouseName,
      warehouseId: inventory.warehouseID,
      category: inventory.category,
      status: inventory.status,
      quantity: inventory.quantity 
    }
  })
  res.json(inventoryArr);
});
//This route returns the specific inventory item detail
router.get("/:id", (req, res) => {
  const allInventory = readInventory();

  const item = allInventory.find((inventory) => {
    return inventory.id === req.params.id;
  });

  if (!item) return res.status(404).send("Item NOT Found!");

  res.json(item);
});

// This route will Put/Patch Edit a single inventory item
router.put('/:id', (req, res) => {
  res.send(req.body);
  const individualItem = inventories.map(item => item.id === req.params.id && item.warehouseName === req.params.warehouseName);
  const inventories = readInventory();
  writeInventory(inventories);
  inventories.slice(individualItem);
  inventories.push(req.body);
  res.status(201).send({
    status: 'item created'
  });
  res.json('Inventory item');
router.get('/warehouses/:id', (req, res) => {
  const inventory = readInventory();
  const warehouseID = req.params.id;
  const warehouseInventory = inventory.filter((item) => item.warehouseID === warehouseID);
  console.log(warehouseInventory)
  if (!warehouseInventory) {
    return res.status(404).send('Warehouse is out of stock');
  }
  res.json(warehouseInventory)
})

module.exports = router;