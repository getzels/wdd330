import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const externalServices = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const itemSumary = document.querySelector(
        this.outputSelector + "#subtotal"
      );
      const itemNumElement = document.querySelector(
        this.outputSelector + "#num-items"
      );

      itemNumElement.innerHTML = this.list.length;

      let finalPrices = this.list.map(function(item) {
        const object = JSON.parse(item)
        return object.FinalPrice;
      });
      this.itemTotal = finalPrices.reduce((sum, item) => sum + item);
      itemSumary.innerHTML = "$" + this.itemTotal;

      this.calculateOrdertotal();
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + (this.list.length - 1) * 2;
      this.tax = (this.itemTotal * 0.06);
      this.orderTotal = (this.itemTotal + this.shipping + this.tax)
      
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      document.querySelector("#orderTotal").innerHTML = "$" + this.orderTotal;
      document.querySelector("#tax").innerHTML = "$" + this.tax;
      document.querySelector("#shipping").innerHTML = "$" + this.shipping;
    }

    async checkout() {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const form = document.forms["checkout"];

        const json = formDataToJSON(form);

        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list)
        json.orderDate = new Date();

        console.log(json);

        try {
          const res = await externalServices.postData(json);

          this.cleanCheckoutForm(form);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
        // call the checkout method in our ExternalServices module and send it our data object.
      }

      cleanCheckoutForm(form) {
        window.alert("The order was placed")
        document.querySelector("#orderTotal").innerHTML = "$";
        document.querySelector("#tax").innerHTML = "$";
        document.querySelector("#shipping").innerHTML = "$";
        document.querySelector("#subtotal").innerHTML = "$";
        document.querySelector("#num-items").innerHTML = "";
        form.reset();
      }
    
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    const simplifiedItems = items.map((item) => {
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

  // takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

    console.log(formData);

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}