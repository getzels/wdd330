import { renderListWithTemplate } from "./utils.mjs"

function productCardTemplate(product) {
    return `<li class="cart-card divider">
                <a href="#" class="cart-card__image">
                <img src="${product.Image}" alt="${product.Name}"
                />
                </a>
                <a href="product_pages/index.html?product=${product.Id}">
                <h2 class="card__name">${product.Name}</h2>
                </a>
                <p class="cart-card__color">${product.Colors[0].ColorName}</p>
                <p class="cart-card__quantity">qty: ${product.quantity}</p>
                <p class="cart-card__price">$${product.FinalPrice}</p>
            </li>`
  }

  export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }
    renderCartContents() {
      const cartItems = getLocalStorage(this.key);
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
  } 