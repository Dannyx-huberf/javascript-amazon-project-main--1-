import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../deliveryOption.js";
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary() {
  let productCent = 0;
  let shippingCent = 0;

  cart.forEach(cartItem => {

  let matchingProduct = products.find(product => product.id == cartItem.productId);
  productCent += matchingProduct.priceCents * cartItem.quantity;

  let deliveryOption = deliveryOptions.find(option => option.id == cartItem.deliveryOptionId);
  shippingCent += deliveryOption.priceCents * cartItem.quantity;
});


  const totalPriceBeforeTax = productCent + shippingCent;
 
  const taxCents = totalPriceBeforeTax * 0.1; 

  const totalPrice = totalPriceBeforeTax + taxCents;


  const paymentSummaryHtml = 
  `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-quantity">${paymentSummaryQuantity}):</div>
            <div class="payment-summary-money">
              $${formatCurrency(productCent)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
              $${formatCurrency(shippingCent)}
            </div>
            </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalPriceBeforeTax)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
              $${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalPrice)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
          `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
  function paymentSummaryQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    const paymentSummaryQuantity = document.querySelector('.js-payment-summary-quantity');
    if (paymentSummaryQuantity) {
      paymentSummaryQuantity.textContent = 'Items : ('+cartQuantity+') items';
    }
  }
  paymentSummaryQuantity();
}