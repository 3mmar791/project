// cart open close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// open the cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// close the cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Making add to cart
// card warking js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// making function
function ready() {
  // Remove Item from cart
  var removeCartButton = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButton.length; i++) {
    var button = removeCartButton[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity change
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

// Remove Cart Item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  uppdatedTotal();
}

// Quantity changed
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  uppdatedTotal();
}

// Add Cart Function
function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  var price = shopProduct.getElementsByClassName("price")[0].innertext;
  var productImg = shopProduct.getElementsByClassName("product-img")[0];
  addProductToCart(title, price, productImg);
  uppdatedTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added item to cart.");
      return;
    }
  }
  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img" />
              <div class="detail-box">
                <div class="cart-producr-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input
                  type="number"
                  name=""
                  id=""
                  value="1"
                  class="cart-quantity"
                />
              </div>
              <!-- Remove Item -->
              <i class="bx bx-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.apppend(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Update total
function uppdatedTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerHTML.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  // if price contain some cents
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
