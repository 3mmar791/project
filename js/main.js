// Get all the "Add to Cart" buttons
var addCartButtons = document.querySelectorAll(".add-cart");

// Get the cart content element
var cartContent = document.querySelector(".cart-content");

// Get the total price element
var totalPriceElement = document.querySelector(".total-price");

// Get the "Close Cart" button
var closeCartButton = document.querySelector("#close-cart");

// Get the "Pay Now" button
var payNowButton = document.querySelector(".btn-buy");

// Keep track of the total price
var totalPrice = 0;

// Keep track of the number of items in the cart
var cartQuantity = 0;

// Load cart items from local storage
loadCartItems();

// Add event listeners to the "Add to Cart" buttons
addCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var productBox = this.closest(".product-box");
    var title = productBox.querySelector(".product-title").innerText;
    var price = productBox.querySelector(".price").innerText;
    var image = productBox.querySelector(".product.img").src;

    addProductToCart(title, price, image);
    uppdatedTotal();
    updateCartQuantity();
    saveCartItems();
  });
});

// Function to add a product to the cart
function addProductToCart(title, price, image) {
  var cartItem = document.createElement("div");
  cartItem.classList.add("cart-box");

  var cartItemContent = `
    <img src="${image}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt cart-remove'></i>
  `;

  cartItem.innerHTML = cartItemContent;
  cartContent.appendChild(cartItem);

  // Add event listener to the "Remove from Cart" button
  var cartRemoveButton = cartItem.querySelector(".cart-remove");
  cartRemoveButton.addEventListener("click", function () {
    removeCartItem(this);
    saveCartItems();
  });

  // Add event listener to the quantity input
  var cartQuantityInput = cartItem.querySelector(".cart-quantity");
  cartQuantityInput.addEventListener("change", function () {
    updateCartItemQuantity(this);
    saveCartItems();
  });

  saveCartItems();
}

// Function to update the total price
function uppdatedTotal() {
  var cartBoxes = document.querySelectorAll(".cart-box");
  totalPrice = 0;

  cartBoxes.forEach(function (cartBox) {
    var priceElement = cartBox.querySelector(".cart-price");
    var quantityElement = cartBox.querySelector(".cart-quantity");
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = parseInt(quantityElement.value);

    totalPrice += price * quantity;
  });

  totalPriceElement.innerText = "$" + totalPrice.toFixed(2);
  localStorage.setItem("cartTotal", totalPrice.toFixed(2));
}

// Function to update the cart quantity
function updateCartQuantity() {
  var cartQuantityElement = document.getElementById("cart-icon");
  var cartBoxes = document.querySelectorAll(".cart-box");
  cartQuantity = cartBoxes.length;

  cartQuantityElement.dataset.quantitiy = cartQuantity;
}

// Function to remove a cart item
function removeCartItem(button) {
  button.closest(".cart-box").remove();
  uppdatedTotal();
  updateCartQuantity();
}

// Function to update the cart item quantity
function updateCartItemQuantity(input) {
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  uppdatedTotal();
}

// Event listener for the "Close Cart" button
closeCartButton.addEventListener("click", function () {
  document.querySelector(".cart").classList.remove("active");
});

// Event listener for the "Pay Now" button
payNowButton.addEventListener("click", function () {
  if (totalPrice > 0) {
    alert("Thank you for your purchase!");
    var cartBoxes = document.querySelectorAll(".cart-box");
    cartBoxes.forEach(function (cartBox) {
      cartBox.remove();
    });
    uppdatedTotal();
    updateCartQuantity();
    localStorage.clear();
  } else {
    alert("Your cart is empty.");
  }
});

// Toggle the cart when the cart icon is clicked
var cartIcon = document.getElementById("cart-icon");
cartIcon.addEventListener("click", function () {
  document.querySelector(".cart").classList.toggle("active");
});

// Function to save cart items to local storage
function saveCartItems() {
  var cartBoxes = document.querySelectorAll(".cart-box");
  var cartItems = [];

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var titleElement = cartBox.querySelector(".cart-product-title");
    var priceElement = cartBox.querySelector(".cart-price");
    var quantityElement = cartBox.querySelector(".cart-quantity");
    var productImg = cartBox.querySelector(".cart-img").src;

    var item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };
    cartItems.push(item);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to load cart items from local storage
function loadCartItems() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems) {
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);

      var cartBoxes = document.querySelectorAll(".cart-box");
      var cartBox = cartBoxes[cartBoxes.length - 1];
      var quantityElement = cartBox.querySelector(".cart-quantity");
      quantityElement.value = item.quantity;
    }

    var cartTotal = parseFloat(localStorage.getItem("cartTotal"));
    if (cartTotal) {
      totalPriceElement.innerText = "$" + cartTotal.toFixed(2);
    }

    updateCartQuantity();
  }
}
