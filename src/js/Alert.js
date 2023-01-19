export default class Alert {
  constructor() {
    const alertHTML = document.createElement("section");

    let data = getData();
    if (data != null) {
      alertHTML.className = "alert-list";

      data.forEach((element) => {
        const pHtml = document.createElement("p");
        pHtml.style.color = element.color;
        pHtml.style.backgroundColor = element.backgroundColor;

        alertHTML.appendChild(pHtml);
      });

      const mainHTML = document.getElementsByTagName("main");
      mainHTML.appendChild(alertHTML);
    }
  }
}

function getData() {
  return fetch(`../json/alert.json`)
    .then(convertToJson)
    .then((data) => data);
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
