import {cart,removeFromCart,calculateCartItemQuantity,updateQuantity} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from "./utils/money.js";
calculateCartItemQuantity();
let cartSummaryHtml = '';
cart.forEach(cartItem=>{
  const productId = cartItem.productId;

 //find the matching product by id
let matchingProduct = products.find(product => product.id == productId);


  cartSummaryHtml += `
      <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id} ">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input type="number" class="quantity-input js-quantity-input"> 

              <span class="save-quantity-link js-save-link link-primary" tabindex="0" data-product-id="${matchingProduct.id}" >
                Save
              </span>

              <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
           Delete
          </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

// Function to handle save logic (reusable for both click and keypress)
function handleSave(productId) {
  const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
  cartItemContainer.classList.remove('is-editing-quantity');
  
  const quantityInput = cartItemContainer.querySelector('.js-quantity-input');
  const quantityValue = parseInt(quantityInput.value, 10);
  
  if (isNaN(quantityValue) || quantityValue < 1) {
    alert('Please enter a valid quantity.');
    return;
  }

  updateQuantity(productId, quantityValue);
  
  const quantityLabel = cartItemContainer.querySelector('.quantity-label');
  quantityLabel.textContent = quantityValue;
  calculateCartItemQuantity();
}

//loops through all the delete links and adds an event listener to each of them

document.querySelectorAll('.js-delete-link').forEach(link=>{
  link.addEventListener('click',event=>{
    const productId = link.dataset.productId;
    // when the delete link is clicked, it removes the item from the cart and removes the item from the DOM and the cart array
    removeFromCart(productId);
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    cartItemContainer.remove();
    calculateCartItemQuantity();
  });
});

document.querySelectorAll('.js-update-link').forEach(link=>{
  link.addEventListener('click',event=>{
    const productId = link.dataset.productId;
    console.log(productId);

    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    cartItemContainer.classList.add('is-editing-quantity');
    
  });
});

document.querySelectorAll('.js-save-link').forEach(link=>{
  link.addEventListener('click',event=>{
    const productId = link.dataset.productId;
   handleSave(productId);
  });
});
/// Add keydown event listener for the "Save" link to handle Enter key press
/// This allows keyboard users to trigger the save action by pressing Enter when focused on the link
/// Note: This is only necessary if the link is focusable (e.g., has a tabindex attribute)
/// Enter Key Event (if element is focusable)
document.querySelectorAll('.js-save-link').forEach(link => {
  link.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      const productId = link.dataset.productId;
      handleSave(productId);
    }
  });
});