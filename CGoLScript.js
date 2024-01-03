g = document.getElementById("grid_container")
w = document.getElementById("grid_container")
h = document.getElementById("grid_container")










const grid_Container = document.getElementById("grid_container")

for (let i = 1; i < 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.textContent = i;
    grid_Container.appendChild(gridItem);
}