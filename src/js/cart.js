import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const itemJson = JSON.parse(item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${itemJson.Image}"
      alt="${itemJson.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${itemJson.Name}</h2>
  </a>
</li>`;

  return newItem;
}

renderCartContents();
