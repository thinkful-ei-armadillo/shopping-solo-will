'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function deleteItemFromList(itemIndex) {
  console.log('Delete item at index ' + itemIndex);
  STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromList(itemIndex);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);





/*

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  const html = STORE.item.map((item, index) => generateHtml(item, index)).join('');
  console.log('`renderShoppingList` ran');
  // let filteredItems = [...STORE.items];
  // if (STORE.hidechecked) {
    filteredItems = filteredItems.filter(item => {
      items.checked === false;
    })
  }
  return $('.js-shopping-list').html(html);
}

Afternoon workshop notes:
const STORE = {
  items: {
    [
      {name: 'apples', checked: false},
      {name: 'oranges', checked: false},
      {name: 'milk', checked: true},
      {name: 'bread', checked: false}
    ];
    hideChecked: false;
  }
}


function toggleHideCheckedState() {
  STORE.hideChecked = !STORE.hideChecked;
}

function handleToggleCheckedItem() {
  $(#hide-completed-checkbox').click () => {
    // change the StORE
    toggleHideChckedState();
    // renderShoppingList();
    renderShoppingList();
  }
}

*/