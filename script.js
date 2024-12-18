// Select Elements
const itemInput = document.getElementById("item-input");
const addItemButton = document.getElementById("add-item-btn");
const shoppingItemsList = document.getElementById("shopping-items-list");
const sortItemsSelect = document.getElementById("sort-items");
const shareButton = document.getElementById("share-list");

// Initialize Shopping List
let shoppingList = [];

// Add Item to List
addItemButton.addEventListener("click", function() {
    const itemText = itemInput.value.trim();
    if (itemText) {
        shoppingList.push(itemText);
        itemInput.value = "";
        updateList();
    }
});

// Sort Items
sortItemsSelect.addEventListener("change", function() {
    updateList();
});

// Function to Update the List
function updateList() {
    const sortedList = sortItemsSelect.value === "alphabetical" 
        ? [...shoppingList].sort()
        : [...shoppingList].sort().reverse();

    shoppingItemsList.innerHTML = "";
    sortedList.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("shopping-item");
        listItem.innerHTML = `
            <span>${item}</span>
            <button class="delete-item-btn" data-index="${index}">Delete</button>
        `;
        shoppingItemsList.appendChild(listItem);
    });

    // Attach Delete Event
    const deleteButtons = document.querySelectorAll(".delete-item-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const index = button.getAttribute("data-index");
            shoppingList.splice(index, 1);
            updateList();
        });
    });
}

// Share List Functionality (For demonstration purposes)
shareButton.addEventListener("click", function() {
    const listContent = shoppingList.join(", ");
    alert(`Sharing List: ${listContent}`);
});

// Initial List Render
updateList();
