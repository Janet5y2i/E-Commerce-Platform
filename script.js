// script.js – GameForge Catalogue Starter (1-week version)
// Students: implement the missing logic

// State
let items = [];
let cartCount = 0;

// DOM elements
const catalogue = document.getElementById('catalogue');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-filter');
const themeToggle = document.getElementById('theme-toggle');
const cartDisplay = document.getElementById('cart-count');
const resetBtn = document.getElementById('reset-cart');
const statusMsg = document.getElementById('status-message');

// JSON loader (provided)
function loadJSON(path, callback, errorCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    } else {
      errorCallback(xhr);
    }
  };
  xhr.onerror = errorCallback;
  xhr.send();
}

// TODO: Render all or filtered items as cards
function renderItems(filteredItems) {
  catalogue.innerHTML = '';
  // Students: create article.card elements
  // include img, h3 (name), p.price, p.category, p.rating
  // add button "Add to Cart"

  //if there is no item in items, print "No matches found."
  if (filteredItems.length === 0){
    catalogue.innerHTML = '<p>No matches found.</p>';
    return;
  }

  //setting the rating display: number of full stars == floor of rating
  function ratingStars(rating){
    if (rating === null || rating === undefined){
      return 'No rating';
    }

    const maxStars = 5;
    const numOfFullStars = Math.floor(rating);
    const numOfEmptyStars = maxStars - numOfFullStars;

    return '★'.repeat(numOfFullStars) + '☆'.repeat(numOfEmptyStars);
  }

  // display the filtered items card
  filteredItems.forEach(item => {
    const card = document.createElement('article');
    // adding class for the card
    card.className = 'card';
    
    function noImg(){

    }
    //button : when click, trigger addToCart function
    card.innerHTML =`
    <img src="${item.thumbnail|| 'images/default.png'}" 
      onerror="this.src='images/default.png'; this.onerror=null;"
      alt = "${item.name}">
    <div class = "card-content">
      <h3>${item.name}</h3>
      <p>${item.category || ""}</p>
      <p class = "price">$${item.price.toFixed(2)}</p>
      <button onclick = "addToCart(${item.id})">Add to Cart</button>
    </div>
    
    `

    // insert the html into 'category-filter'
    catalogue.appendChild(card)
  })

}

// TODO: Populate category dropdown + fake option
function populateCategories() {
  // Students: collect unique categories
  // add "all" and one fake category (e.g. "Quantum Mods")

  // adding all elements into a set (unique)
  const categories = new Set();
  items.forEach(item => {
    const itemCategory = item.category ;
  categories.add(itemCategory) 
  })
  categories.add("FakeCategory") ;
  // transfer to array so that can sort the items
  const categoryArray = Array.from(categories).sort() ;
  //console.log(categoryArray)


  //add all the element
  categoryArray.forEach(cat => {
    var category = document.createElement('option');
    if (cat === "" || cat === undefined || cat === null){
      category.value = cat;
      category.text = "Undefined";
      categorySelect.add(category);

    } else {
      category.value = cat;
      category.text = cat;
      categorySelect.add(category);
    }
  })

}

// TODO: Apply category filter + search highlight
function updateDisplay() {
  // Students: filter by category
  // then highlight cards matching search term (only visible ones)

  // create a new arry containing only the the elements that match the condition
  const selectedCategory = categorySelect.value;
  const filteredItems = items.filter(item => {
    if(item.category === selectedCategory || selectedCategory.toLowerCase() === "all"){
      return item
    }
  })


  //apply filter item to renderItems
  renderItems(filteredItems);

  // get the input value, and turn to lower case => case insensitive
  const inputValue = searchInput.value.toLowerCase();

  // get all the card, highlight the card includes the filter text using class = highlight (setting in css)
  const highLightCards = Array.from(document.getElementsByClassName("card"));
  highLightCards.forEach(card => {
    if (card.querySelector('h3').textContent.toLocaleLowerCase().includes(inputValue) && inputValue != ""){
      card.classList.add('highlight') ;
    } else {
      card.classList.remove('highlight') ;
    }
  })
  


}

// TODO: Add one item to cart (simple count of unique items)
function addToCart(itemId) {
  // Students: increment cartCount
  // update cartDisplay text
  cartCount++;
  cartDisplay.textContent = `
    Cart: ${cartCount} items
  `
}

// Event listeners (students need to connect logic)
searchInput.addEventListener('input', updateDisplay);
categorySelect.addEventListener('change', updateDisplay);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark')
    ? 'Light Mode'
    : 'Dark Mode';
});

resetBtn.addEventListener('click', () => {
  if (cartCount > 0 && confirm('Are you sure you want to reset the cart?')) {
    cartCount = 0;
    cartDisplay.textContent = 'Cart: 0 items';
  }
});

// Start
window.addEventListener('load', () => {
  loadJSON('artifacts.json',
    (data) => {
      items = data;
      populateCategories();
      renderItems(items);
      console.log(`Loaded ${items.length} items`);
    },
    (err) => {
      console.error('Failed to load assets.json', err);
      statusMsg.textContent = 'Error loading catalogue';
      statusMsg.style.display = 'block';
    }
  );
});
