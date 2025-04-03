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

addToCartButton.forEach((button)=>{
  button.addEventListener('click',()=>{
    //store the data attribute for the add to cart button
    const productId = button.dataset.productId;
    console.log(productId);


    //create a matching item container that finds and stores a product id in the cart
    let matchingItem = cart.find(item => item.productId === productId);

    //if the items match increase the quantity if not add a new cart
    if(!matchingItem){
      cart.push({
        productId:productId,
        quantity:1
      });
    }else{
      matchingItem.quantity+=1;
    }
  });
  
});


