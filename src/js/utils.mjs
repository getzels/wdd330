// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  var dataArray = getLocalStorage(key);
  
  if(dataArray == null) {
    dataArray = [];
  }
  
  dataArray.push(JSON.stringify(data));
  localStorage.setItem(key, JSON.stringify(dataArray));  
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param)

}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
      parentElement.innerHTML = ""
    }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));

}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const header = document.querySelector("#mainHeader");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footer = document.querySelector("#mainFooter");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}

function convertToText(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  const messageAlert = document.createElement('p');
  messageAlert.innerHTML = message;
  const buttomAlert = document.createElement('span');
  buttomAlert.innerHTML = "&times;";
  buttomAlert.classList.add("close-btn");

  alert.appendChild(messageAlert);
  alert.appendChild(buttomAlert);

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  buttomAlert.addEventListener('click', function(e) {
      main.removeChild(alert);
  });
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}