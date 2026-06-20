
const products = [
  { id: 1, name: "Candlelight Dinner",       price: 14999, image: "product-1.jpg", categories: ["husband", "wife", "boyfriend", "girlfriend"] },
  { id: 2, name: "Balloon Room Decoration",  price: 8499,  image: "product-2.jpg", categories: ["husband", "wife", "boyfriend", "girlfriend"] },
  { id: 3, name: "Surprise Night Drive",     price: 11200, image: "product-3.jpg", categories: ["boyfriend", "girlfriend"] },
  { id: 4, name: "Photo Memory Wall",        price: 9999,  image: "product-4.jpg", categories: ["husband", "wife", "bestfriend"] },
  { id: 5, name: "Terrace Light Decoration", price: 13500, image: "product-5.jpg", categories: ["husband", "wife"] },
  { id: 6, name: "Private Theatre Booking",  price: 54999, image: "product-6.jpg", categories: ["husband", "wife", "boyfriend", "girlfriend"] },
  { id: 7, name: "Car Boot Surprise",        price: 6900,  image: "product-7.jpg", categories: ["boyfriend", "girlfriend"] },
  { id: 8, name: "Garden Tent Picnic",       price: 15499, image: "product-8.jpg", categories: ["husband", "wife", "bestfriend"] }
];

/* ---------- 2. STATE VARIABLES ----------
   These simple variables remember what the user has chosen. */
let selectedCategories = [];   
let currentSort = "featured";  
let cart = [];                 
/* =====================================================================
   3. SHOWING PRODUCTS ON THE PAGE
   ===================================================================== */

// This function builds the HTML for ONE product card.
function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="image-box">
        <img src="images/${product.image}" alt="${product.name}" onerror="this.style.display='none'">
      </div>
      <div class="info">
        <h4>${product.name}</h4>
        <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
        <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

// This function decides WHICH products to show, then draws them.
function renderProducts() {

  // Step 1: filter — keep only products that match the ticked checkboxes.
  // If nothing is ticked, show everything.
  let visibleProducts = products.filter(function (product) {
    if (selectedCategories.length === 0) {
      return true;
    }
    // .some() checks if AT LEAST ONE of the product's categories
    // is inside our selectedCategories list.
    return product.categories.some(function (cat) {
      return selectedCategories.includes(cat);
    });
  });

  // Step 2: sort — rearrange the filtered list based on the dropdown.
  if (currentSort === "low") {
    visibleProducts.sort(function (a, b) { return a.price - b.price; });
  } else if (currentSort === "high") {
    visibleProducts.sort(function (a, b) { return b.price - a.price; });
  }

  // Step 3: draw — turn the array into HTML and put it on the page.
  const grid = document.getElementById("productGrid");

  if (visibleProducts.length === 0) {
    grid.innerHTML = `<div class="empty-state"><h3>No surprises match yet</h3><p>Try clearing a filter.</p></div>`;
  } else {
    grid.innerHTML = visibleProducts.map(createProductCard).join("");
  }

  // Update the "X surprises found" text.
  document.getElementById("resultCount").textContent = visibleProducts.length;
}


/* =====================================================================
   4. FILTER CHECKBOXES
   ===================================================================== */

// Every time ANY checkbox is clicked, this function runs.
function updateFilters() {
  const checkboxes = document.querySelectorAll(".filterCheckbox");
  selectedCategories = [];

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value);
    }
  });

  renderProducts();
}

// Attach the same function to every checkbox.
document.querySelectorAll(".filterCheckbox").forEach(function (checkbox) {
  checkbox.addEventListener("change", updateFilters);
});

// "Clear Filters" button — unticks every checkbox and shows everything again.
document.getElementById("clearBtn").addEventListener("click", function () {
  document.querySelectorAll(".filterCheckbox").forEach(function (checkbox) {
    checkbox.checked = false;
  });
  selectedCategories = [];
  renderProducts();
});


/* =====================================================================
   5. SORT DROPDOWN
   ===================================================================== */
document.getElementById("sortSelect").addEventListener("change", function (event) {
  currentSort = event.target.value;
  renderProducts();
});


/* =====================================================================
   6. MOBILE "FILTERS" BUTTON
   ===================================================================== */
document.getElementById("filterBtn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open");
});


/* =====================================================================
   7. SHOPPING CART
   ===================================================================== */

// Runs when an "Add to Cart" button is clicked.
function addToCart(productId) {
  // Find the matching product using its id.
  const product = products.find(function (p) { return p.id === productId; });

  // Check if it's already in the cart.
  const existingItem = cart.find(function (item) { return item.id === productId; });

  if (existingItem) {
    existingItem.qty = existingItem.qty + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  renderCart();
  openCart();
}

// Runs when a "Remove" button inside the cart is clicked.
function removeFromCart(productId) {
  cart = cart.filter(function (item) { return item.id !== productId; });
  renderCart();
}

// Rebuilds the cart sidebar HTML every time the cart changes.
function renderCart() {
  const cartItemsBox = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartItemsBox.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
  } else {
    cartItemsBox.innerHTML = cart.map(function (item) {
      return `
        <div class="cart-item">
          <div>
            <h5>${item.name}</h5>
            <p>Qty: ${item.qty} &nbsp;•&nbsp; ₹${item.price.toLocaleString('en-IN')}</p>
          </div>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    }).join("");
  }

  // Work out the total price and the total number of items.
  let total = 0;
  let totalQty = 0;
  cart.forEach(function (item) {
    total = total + (item.price * item.qty);
    totalQty = totalQty + item.qty;
  });

  document.getElementById("cartTotal").textContent = "₹" + total.toLocaleString('en-IN');
  document.getElementById("cartCount").textContent = totalQty;
}

// Open / close the cart sidebar.
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);


/* =====================================================================
   8. RUN ON PAGE LOAD
   ===================================================================== */
renderProducts();
renderCart();