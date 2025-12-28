const table = document.getElementById("bazaar");
const search = document.getElementById("search");

let allItems = [];

fetch("https://api.hypixel.net/skyblock/bazaar")
  .then(res => res.json())
  .then(data => {
    allItems = Object.entries(data.products);
    render(allItems);
  });

function render(items) {
  table.innerHTML = "";

  items.forEach(([name, info]) => {
    const buy = info.quick_status.buyPrice;
    const sell = info.quick_status.sellPrice;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${buy.toFixed(2)}</td>
      <td>${sell.toFixed(2)}</td>
    `;
    table.appendChild(row);
  });
}

search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = allItems.filter(([name]) =>
    name.toLowerCase().includes(value)
  );
  render(filtered);
});
