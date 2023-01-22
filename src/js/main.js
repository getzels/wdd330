import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const datasource = new productData("tents");

const listElement = document.getElementsByClassName("product-list")[0];

const listProduct = new ProductListing("tents", datasource, listElement);
listProduct.init();