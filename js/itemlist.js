import { getItemList } from "./database.js";

window.addEventListener("load", async () => {
  let items = await getItemList();
  let container = document.getElementById("item-table");
  items.forEach((item) => {
    let data = item.data();
    let content =
      "<td>" +
      data.name +
      "</td>" +
      "<td>" +
      data.productNumber +
      "</td>" +
      "<td>" +
      data.serialNumber +
      "</td>" +
      "<td>" +
      data.department +
      "</td>" +
      "<td>" +
      data.category +
      "</td>";
    let newRow = document.createElement("tr");
    newRow.innerHTML = content;
    container.appendChild(newRow);
  });
});
