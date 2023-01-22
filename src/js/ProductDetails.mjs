import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource ) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails(this.product);

        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        setLocalStorage("so-cart", this.product);
    }

    renderProductDetails(product) {
        this.cleanProductDetail();
        document.getElementById('name').innerHTML = product.Brand.Name;
        document.getElementById('NameWithoutBrand').innerHTML = product.NameWithoutBrand;


        const productImage = document.getElementById('productImage');
        productImage.setAttribute('src', product.Image);
        productImage.setAttribute('alt', product.Name);
        document.getElementsByClassName('product-card__price')[0].innerHTML = product.FinalPrice;
        document.getElementsByClassName('product__color')[0].innerHTML = product.Colors[0].ColorName;
        document.getElementsByClassName('product__description')[0].innerHTML = product.DescriptionHtmlSimple;

        document.getElementById('addToCart').setAttribute("data-id", product.Id);
    }

    cleanProductDetail() {
        document.getElementById('name').innerHTML = null;
        document.getElementById('NameWithoutBrand').innerHTML = null;

        document.getElementsByTagName('img').src = null;
        document.getElementsByClassName('product-card__price').innerHTML = null;
        document.getElementsByClassName('product__color').innerHTML = null;
        document.getElementsByClassName('product__description').innerHTML = null;

        document.getElementById('addToCart').setAttribute("data-id", null);
    }
}