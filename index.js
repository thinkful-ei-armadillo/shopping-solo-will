'use strict';
/* global $ */

const STORE = {
  items: 
    [
      {name: 'apples', checked: false},
      {name: 'oranges', checked: false},
      {name: 'milk', checked: true},
      {name: 'bread', checked: false}
    ],
  hideCompleted: false
};


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
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList(shoppingList = STORE.items) { // set default parameter to STORE.items
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  if (STORE.hideCompleted) {
    const filtered = STORE.items.filter(item => !item.checked);
    let shoppingListItemsString = generateShoppingItemsString(filtered); 
    $('.js-shopping-list').html(shoppingListItemsString);
  } else {
  // if else condition to filter out the items that are checked 
    let shoppingListItemsString = generateShoppingItemsString(shoppingList);
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

// ----- alternative with ternary ------
// const shoppingListItemsString = STORE.hideCompleted ? generateShoppingItemsString(STORE.items.filter(item => !item.checked)) : generateShoppingItemsString(STORE.items);
// $('.js-shopping-list').html(shoppingListItemsString);

// ================ ADD ITEM FUNCTIONALITY ===========================

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
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

// ================ CHECKING ITEM FUNCTIONALITY ===========================

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

// ================ TOGGLE ALL CHECKED FUNCTIONALITY ===========================

function toggleCheckedItem() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleCheckedItem() {
  $('#js-hide-completed-checkbox').on('click', event => {
    console.log('`handleToggleCheckedItem` ran');
    toggleCheckedItem();
    renderShoppingList();
  });
}

// ====================== DELETE FUNCTIONALITY ===========================

function deleteItemFromList(itemIndex) {
  console.log('Delete item at index ' + itemIndex);
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromList(itemIndex);
    renderShoppingList();
  });
}

// ====================== SEARCH FUNCTIONALITY ===========================

// create function to iterate through and filter STORE.items for the value of user input grabbed from search value. Maybe use find() or filter()?
function filterSearchItem(input) {
  return STORE.items.filter(item => item.name === input);
}

// create function to grab value of user input (similar to handleNewItemSubmit)
function handleNewSearchItem() {
  $('#js-search-form').submit(function(event) {
    event.preventDefault();
    const searchInput = $('.js-search-entry').val();
    const searchResults = filterSearchItem(searchInput);
    console.log(searchInput);
    console.log(searchResults);
    $('.js-search-entry').val('');
    // filterSearchItem(searchValue);
    // console.log(filterSearchItem(searchValue));
    if (searchResults.length < 1) { // if search result input is empty on submit click then render normal shopping list without search result filter
      renderShoppingList();
    } else {
      renderShoppingList(searchResults);
    }
  });
}


// ====================== EDIT FUNCTIONALITY ===========================









// if (STORE.items) {
//   const filteredSearchItem = STORE.items.filter(item => !item.name);
//   let searchResultStrings = generateShoppingItemsString(filteredSearchItem);
//   $('.js-shopping-list').html(searchResultStrings);
// } else {
//   let searchResultStrings = generateShoppingItemsString(searchResultStrings);
//   $('.js-shopping-list').html(searchResultStrings);
// }

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleCheckedItem();
  handleNewSearchItem();
}


// when the page loads, call `handleShoppingList`
$(handleShoppingList);
