export let cart = JSON.parse(localStorage.getItem('cart'));
  
  if(cart === null){
   cart =  [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
  }
];
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addtoCart(productId,productContainer){
  // Get the selected quantity from the dropdown
  const quantitySelect = productContainer.querySelector('select');
  const selectedQuantity = parseInt(quantitySelect.value, 10); // Convert to number
  
  // Check if item already exists in cart
  let matchingItem = cart.find(item => item.productId === productId);
  
  if (!matchingItem) {
    // Add new item with selected quantity
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1' // Default delivery option ID
    });
  } else {
    // Update existing item's quantity (add selected quantity)
    matchingItem.quantity += selectedQuantity;
  }
  saveCartToLocalStorage();
}

export function calculateCartItemQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  const amazonCartQuantity = document.querySelector('.js-cart-quantity');
  if (amazonCartQuantity) {
    amazonCartQuantity.textContent = cartQuantity;
  }

  const checkoutQuantity = document.querySelector('.js-checkout-quantity');
  if (checkoutQuantity) {
    checkoutQuantity.textContent = cartQuantity + ' items';
    
  }
}

export function confirmationMsg(productContainer){
  //display the confirmation message by dynamically adding a new class to the add to cart class
  const displayAddMessage = productContainer.querySelector('.added-to-cart');

  displayAddMessage.classList.add('added-to-cart-opacity');

   setTimeout(()=>{
    displayAddMessage.classList.remove('added-to-cart-opacity');
  },2000);
  console.log(displayAddMessage);
}

export function removeFromCart(productId) {
  const newcart = cart.filter(item => item.productId !== productId);

  cart = newcart;
  saveCartToLocalStorage();
}

export function updateQuantity(productId, newQuantity) {
  const cartItem = cart.find(item => item.productId === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    saveCartToLocalStorage();
  }
}
export function updateDeliveryOption(productId,DeliveryOptionId) {
  let matchingItem = cart.find(item => item.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = DeliveryOptionId;
  }
  saveCartToLocalStorage();
}