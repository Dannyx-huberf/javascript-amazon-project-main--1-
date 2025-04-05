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

  let deliveryOption = deliveryOptions.find(option => option.id == cartItem.deliveryOptionId)  || 0;
  shippingCent += deliveryOption.priceCents * cartItem.quantity;
});

  const totalPriceBeforeTax = productCent + shippingCent;
  console.log('Total price before tax:', totalPriceBeforeTax);
  const taxCents = totalPriceBeforeTax * 0.1; 
  console.log('total price with tax:', taxCents);
  const totalPrice = totalPriceBeforeTax + taxCents;
  console.log('Total price:', totalPrice);

  const paymentSummaryHtml = 
  `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
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
}