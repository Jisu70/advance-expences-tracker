console.log(" Hello  I am Expences Manager ");
const API_URL = `http://localhost:3000/api/main`;

// 
async function addExpences() {
  const userData = {};
  userData.amount = document.getElementById("amount").value;
  userData.item = document.getElementById("item").value;
  userData.category = document.getElementById("table").value;
  // TAking token from localstorage
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/savedata`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Send token in header 
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(userData),
  });
  
  let data = await response.json();
  console.log(data);
  showAllExpencesOnScreen();
  showTotalExpenses();
  amount.value = '';
  item.value = '';
}


async function showAllExpencesOnScreen() {
  const token = localStorage.getItem('token');  
  const response = await fetch(`http://localhost:3000/api/main/all-expences`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  const data = await response.json();

  const itemList = document.getElementsByClassName("list-group")[0];

    // Clear the existing content
    itemList.innerHTML = "";

  data.forEach((item) => {
    const listItem = document.createElement("li");

    listItem.className = "list-group-item";

    listItem.textContent = `Item Name : ${item.item} , Item Price : ${item.amount}    Category  : ${item.category} `;

    const editButton = document.createElement("btn");

    editButton.className = "btn btn-info";

    editButton.style.float = 'right';

    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => editItemDetails(item.id, item.item, item.amount, item.category));

    const deleteButton = document.createElement("button");

    deleteButton.className = "btn btn-warning";

    deleteButton.style.float = 'right';

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => deleteItem(item.id));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    itemList.appendChild(listItem);
  });
}

async function editItemDetails(id, itemvalue, itemprice, itemcategory) {
  const item = prompt(" Change The Item name ",itemvalue);
  const amount = prompt(" Change The Item Price ",itemprice);
  const category = prompt(" Change The Item Category ",itemcategory);
  const updatedDetails = {
    id,
    item,
    amount,
    category
  };
  const response = await fetch(`${API_URL}/update-expences`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDetails),
  });
  showAllExpencesOnScreen();
  showTotalExpenses();
}

// Delete function
async function deleteItem(id) {
  const response = await fetch(`${API_URL}/delete-expences`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  console.log(" User deleted", response);
  showAllExpencesOnScreen();
  showTotalExpenses();
}

// Show total expenses
async function showTotalExpenses() {
  const token = localStorage.getItem('token');
  console.log(token)
  const response = await fetch(`http://localhost:3000/api/main/total-expences`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  const data = await response.json();
  let sum = 0;
  data.forEach((result) => {
    sum += parseInt(result.amount);
  });
  document.getElementById('totalAmount').textContent = `Total Expences : ${sum}`
  console.log("Total expenses:", sum);
}


showAllExpencesOnScreen();
showTotalExpenses();

const botam = document.getElementById("btn");

botam.addEventListener("click", (e) => {
  e.preventDefault();
  addExpences();
});
