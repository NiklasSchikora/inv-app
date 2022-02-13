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
  if (navigator.onLine) {
    // If there is a connection, push changes to database / add new item
    let code = await addItemToDb(name, pnum, snum, type, branch);
    generateBarcode(code);
  } else {
    // If offline, cache the item to IndexedDB and sync it later
    // To be done: Barcode-handeling while offline (maybe with Firebase offline ID-API)
    cacheAddItem(name, pnum, snum, type, branch);
  }
});

var db = new Dexie("ItemCache");
db.version(1).stores({
  updates: `
    ++id,
    name,
    pnum,
    snum,
    type,
    branch
  `,
});

const cacheAddItem = (name, pnum, snum, type, branch) => {
  db.updates.put({
    name: name,
    pnum: pnum,
    snum: snum,
    type: type,
    branch: branch,
  });
};

document.getElementById("syncButton").addEventListener("click", async () => {
  let updates = await db.updates.toArray();
  updates.forEach((update) => {
    console.log(update);
    db.updates.where("id").equals(update.id).delete();
    addItemToDb(
      update.name,
      update.pnum,
      update.snum,
      update.type,
      update.branch
    );
  });
});
