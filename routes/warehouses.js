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

//Functions for use with the Delete of a Warehouse API - Inventory in corresponsing warehouses must also be deleted.
function readInventory() {
  const inventoryData = fs.readFileSync("./data/inventories.json");
  const parsedInventory = JSON.parse(inventoryData);
  return parsedInventory;
}

function writeInventory(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/inventories.json", stringifiedData);
}
//////////






















//This route will delete a warehouse and all it's associated inventory
router.get("/delete/:id", (req, res) => {
  const warehouses = readWarehouses();
  const inventories = readInventory();

  const warehouseIndex = warehouses.findIndex((warehouse) => {
    return warehouse.id === req.params.id;
  });
  
  const deletedWarehouse = warehouses[warehouseIndex] 

  if (warehouseIndex === -1){
    return res.status(404).send(`Warehouse ID: ${req.params.id} NOT Found!`);
  }else{
    //New Warehouse file with the deleted warehouse cut out
    warehouses.splice(warehouseIndex, 1); 
    
    //New Inventories file with all of the deleted warehouse inventory items cut out.
    const newInv = inventories.filter(inv => {
      return inv.warehouseID !== req.params.id
    })
    
    //Write Inventory and Warehouse information to json files
    writeInventory(newInv)
    writeWarehouses(warehouses)
  } 
  
  res.status(202).send(`Deleted - Warehouse: ${deletedWarehouse.name} - ${deletedWarehouse.id}, in ${deletedWarehouse.city},  Successfully`);
});

module.exports = router;