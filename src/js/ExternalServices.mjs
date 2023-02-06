import { alertMessage } from "./utils.mjs"

const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    const json = await res.json();
    Object.keys(json).forEach(function(key) {
      alertMessage(json[key]);
    });
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {

  

  constructor(category) {
    // TODO document why this constructor is empty
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async postData(order) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)};

      const response = await fetch(baseURL + `checkout/`, options).then(convertToJson);
  }
}
