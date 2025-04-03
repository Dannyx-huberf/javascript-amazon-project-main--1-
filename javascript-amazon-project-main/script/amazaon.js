import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
// looping through our product object in the products array
let productHtml = '';
products.forEach((product)=>{
  //generating the html for our products dynamically 
  productHtml += ` 
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <!--add a data attribute to the add to cart btn-->
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = ${product.id}>
            Add to Cart
          </button>
        </div>
  `;
});
// console.log(productHtml);

//placing the generated html into our html file using the dom
const productGridContainer = document.querySelector('.js-products-grid');

productGridContainer.innerHTML = productHtml;

//Functionalize the add to cart Button
//by looping through all add to cart button
const addToCartButton=document.querySelectorAll('.js-add-to-cart');

addToCartButton.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    
    // Find the closest product container (to locate its quantity dropdown)
    const productContainer = button.closest('.product-container');
    
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

    //display the confirmation message by dynamically adding a new class to the add to cart class
    const displayAddMessage = productContainer.querySelector('.added-to-cart');

    displayAddMessage.classList.add('added-to-cart-opacity');

    setTimeout(()=>{
      displayAddMessage.classList.remove('added-to-cart-opacity');
    },2000);
    
    // Update the cart total display
    updateCartQuantity();
    
    console.log('Cart:', cart);
  });
});

// Helper function to update cart quantity display
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  const amazonCartQuantity = document.querySelector('.js-cart-quantity');
  if (amazonCartQuantity) {
    amazonCartQuantity.textContent = cartQuantity;
  }
}


