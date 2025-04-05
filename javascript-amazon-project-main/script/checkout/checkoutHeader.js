import { calculateCartItemQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
  const header = document.querySelector(".js-checkout-header");
  if (!header) return; // Check if the header element exists
  const headerHtml = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-checkout-quantity"
            href="amazon.html"></a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
  `;
  header.innerHTML = headerHtml;
  calculateCartItemQuantity();
  return headerHtml;
  
}