import "./database.js";
import { addItemToDb } from "./database.js";
import { generateBarcode } from "./helpers.js";

document.getElementById("addButton").addEventListener("click", async () => {
  let name = document.getElementById("db-name").value;
  let pnum = document.getElementById("db-pnum").value;
  let snum = document.getElementById("db-snum").value;
  let type = document.getElementById("db-type").value;
  let branch = document.getElementById("db-branch").value;
  console.log(name + " " + pnum + " " + snum + " " + type + " " + branch);
  let code = await addItemToDb(name, pnum, snum, type, branch);
  generateBarcode(code);
});
