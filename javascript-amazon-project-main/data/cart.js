export let cart = JSON.parse(localStorage.getItem('cart'));
  
  if(!cart){
   cart =  [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
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
      quantity: selectedQuantity
    });
  } else {
    // Update existing item's quantity (add selected quantity)
    matchingItem.quantity += selectedQuantity;
  }
  saveCartToLocalStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  const amazonCartQuantity = document.querySelector('.js-cart-quantity');
  if (amazonCartQuantity) {
    amazonCartQuantity.textContent = cartQuantity;
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
