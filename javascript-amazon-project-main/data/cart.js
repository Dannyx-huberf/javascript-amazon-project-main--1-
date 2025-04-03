export const cart = [];

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