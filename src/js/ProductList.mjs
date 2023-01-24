import { renderListWithTemplate } from "./utils.mjs"

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3 class="card__brand">${product.Id}</h3>
        <h2 class="card__name">${product.Brand.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`
  }

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
      document.querySelector("#product-category").innerHTML = "Top Products: " + this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, this.filteredList(list));
    }

    filteredList = (list) => list.slice(0, 4); 
  }