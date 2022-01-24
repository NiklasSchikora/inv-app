if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/serviceworker.js");
  });
}

import "./database.js";
import { addItemToDb } from "./database.js";

document.getElementById("testButton").addEventListener("click", () => {
  let name = document.getElementById("db-name").value;
  let pnum = document.getElementById("db-pnum").value;
  let snum = document.getElementById("db-snum").value;
  let type = document.getElementById("db-type").value;
  let branch = document.getElementById("db-branch").value;
  console.log(name + " " + pnum + " " + snum + " " + type + " " + branch);
  // addItemToDb("asda", 123435, 123412, "PC", "Multimedia");
});
