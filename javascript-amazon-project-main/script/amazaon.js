import { cart,addtoCart,updateCartQuantity,confirmationMsg} from "../data/cart.js";
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
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-container">
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

          <div class="added-to-cart js-added-to-cart">
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
  
    addtoCart(productId,productContainer);
    confirmationMsg(productContainer);
    updateCartQuantity();
    
  });
});

