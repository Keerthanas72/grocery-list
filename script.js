const groceryInput = document.getElementById('groceryInput');
const addItemBtn = document.getElementById('addItemBtn');
const resetBtn = document.getElementById('resetBtn');
const groceryList = document.getElementById('groceryList');
const popup = document.getElementById('popup');

let itemId = 1;
let groceryItems = [];

// Load items from local storage
if (localStorage.getItem('groceryItems')) {
  groceryItems = JSON.parse(localStorage.getItem('groceryItems'));
  renderItems();
}

addItemBtn.addEventListener('click', addItem);
groceryInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addItem();
  }
});

function addItem() {
  if (groceryInput.value.trim() === '') return;

  const newItem = {
    id: itemId++,
    name: groceryInput.value,
    completed: false
  };
  groceryItems.push(newItem);
  saveItems();
  renderItems();

  showPopup('Item added!');
  groceryInput.value = '';
}

resetBtn.addEventListener('click', () => {
  groceryItems = [];
  saveItems();
  renderItems();
  showPopup('List reset!');
});

function renderItems() {
  groceryList.innerHTML = '';
  groceryItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${item.name}</span>
      <button class="removeBtn">Remove</button>
    `;
    if (item.completed) {
      listItem.classList.add('completed');
    }
    groceryList.appendChild(listItem);

    const removeBtn = listItem.querySelector('.removeBtn');
    removeBtn.addEventListener('click', () => {
      groceryItems = groceryItems.filter(i => i.id !== item.id);
      saveItems();
      renderItems();
      showPopup('Item removed!');
    });

    listItem.addEventListener('click', () => {
      item.completed = !item.completed;
      saveItems();
      renderItems();
      const message = item.completed ? 'Item scratched!' : 'Item unscratched!';
      showPopup(message);
    });
  });
}

function saveItems() {
  localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
}

function showPopup(message) {
  popup.textContent = message;
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000);
}
