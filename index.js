let candyItems = JSON.parse(localStorage.getItem('candyItems')) || [];
const nameField = document.getElementById('name');
const descriptionField = document.getElementById('description');
const priceField = document.getElementById('price');
const quantityField = document.getElementById('quantity');
const addItemButton = document.getElementById('addItemButton');

function clearItem(){
    localStorage.clear("candyItems")
}

// Function to add a new item to the candyItems array and update local storage
function addItem() {
  // Create a new candy item object with input values

  if (nameField.value === '' || descriptionField.value === '' || priceField.value === '' || quantityField.value === '') {
    alert('Please fill all the value ');
    return;
  }

  const newItem = {
    name: nameField.value,
    description: descriptionField.value,
    price: priceField.value,
    quantity: quantityField.value
  };

  
  // Add the new item to the candyItems array
  candyItems.push(newItem);

  // Update local storage with the new candyItems array
  localStorage.setItem('candyItems', JSON.stringify(candyItems));

  // for clear the field values

  nameField.value = '';
  descriptionField.value = '';
  priceField.value = '';
  quantityField.value = '';

  location.reload();
}

// Add an event listener to the add item button
addItemButton.addEventListener('click', addItem);




// Function to generate table from candy items
function generateTableRows() {
  let tableRows = '';
  candyItems.forEach(item => {
    tableRows += `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td><button onclick="buyOne('${item.name}')">Buy One</button></td>
        <td><button onclick="buyTwo('${item.name}')">Buy Two</button></td>
        <td><button onclick="buyThree('${item.name}')">Buy Three</button></td>
      </tr>
    `;
  });
  return tableRows;
}

// Function to render table
function renderTable() {
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Quantity</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    ${generateTableRows()}
  `;
  document.body.appendChild(table);
}

function buyOne(name) {
    const item = candyItems.find(item => item.name === name);

    if (item && item.quantity > 0) {
      item.quantity--;
    }else{
        alert("No Item left");
      }
  
    // Update local storage with the updated candyItems array
    localStorage.setItem('candyItems', JSON.stringify(candyItems));
    location.reload();
}

// Function to handle buying two items
function buyTwo(name) {

   // Find the item in the candyItems array by name
   
  const item = candyItems.find(item => item.name === name);

  if (item && item.quantity >= 2) {
    item.quantity -= 2;
  }else{
    alert("No Item left");
  }

  // Update local storage with the updated candyItems array
  localStorage.setItem('candyItems', JSON.stringify(candyItems));
  location.reload();

}

// Function to handle buying three items
function buyThree(name) {
  // Find the item in the candyItems array by name
  const item = candyItems.find(item => item.name === name);


  if (item && item.quantity >= 3) {
    item.quantity -= 3;
  }else{
    alert("No Item left");
  }

  // Update local storage with the updated candyItems array
  localStorage.setItem('candyItems', JSON.stringify(candyItems));
 location.reload();
}

// Render the table
renderTable();