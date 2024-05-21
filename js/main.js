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
  cartRemoveButton.addEventListener("click", removeCartItem);

  // Add event listener to the quantity input
  var cartQuantityInput = cartItem.querySelector(".cart-quantity");
  cartQuantityInput.addEventListener("change", updateCartItemQuantity);
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
}

// Function to update the cart quantity
function updateCartQuantity() {
  var cartQuantityElement = document.getElementById("cart-icon");
  var cartBoxes = document.querySelectorAll(".cart-box");
  cartQuantity = cartBoxes.length;

  cartQuantityElement.dataset.quantitiy = cartQuantity;
}

// Function to remove a cart item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.closest(".cart-box").remove();
  uppdatedTotal();
  updateCartQuantity();
}

// Function to update the cart item quantity
function updateCartItemQuantity(event) {
  var input = event.target;
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
  } else {
    alert("Your cart is empty.");
  }
});

// Toggle the cart when the cart icon is clicked
var cartIcon = document.getElementById("cart-icon");
cartIcon.addEventListener("click", function () {
  document.querySelector(".cart").classList.toggle("active");
});
