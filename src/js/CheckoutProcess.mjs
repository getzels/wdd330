import { getLocalStorage } from "./utils.mjs";

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
        this.outputSelector + " #subtotal"
      );
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items"
      );

      itemNumElement.innerHTML = this.list.length;

      this.itemTotal = this.list.map((item) => item.FinalPrice)
                                .reduce((sum, item) => sum + item);
      itemSumary.innerText = "$" + this.itemTotal;

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

    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    
        // call the checkout method in our ExternalServices module and send it our data object.
      }
    
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  
  }