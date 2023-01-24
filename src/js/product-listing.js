import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
const datasource = new productData();

const listElement = document.getElementsByClassName("product-list")[0];

const listProduct = new ProductListing(category, datasource, listElement);
listProduct.init();
