const xlsx = require("xlsx");
const fs = require("fs");

const workbook = xlsx.readFile("Fireworks Inventory.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync("Fireworks Inventory.json", JSON.stringify(data, null, 2));
console.log("Fireworks Inventory converted to JSON!");