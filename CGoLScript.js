const grid_Container = document.getElementById("grid_container")

for (let i = 1; i < 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.textContent = i;
    grid_Container.appendChild(gridItem);
}