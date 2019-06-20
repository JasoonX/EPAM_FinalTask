"use strict";
const searchButton = document.querySelector(".searchBtn");
const searchButtonImg = searchButton.querySelector("img");
const searchInput = document.querySelector(".searchInput");
const searchToggle = document.querySelector(".toggleSearchCheck");
const basket = document.querySelector(".basket p");
const search = document.querySelector(".search");

if (localStorage) {
  if (localStorage.getItem("email") !== "serhii.pylypenko@nure.ua") {
    localStorage.clear();
    localStorage.setItem("email", "serhii.pylypenko@nure.ua");
  }
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let count = cart.reduce(function(prev, cur) {
      return prev + cur.count;
    }, 0);
    basket.innerText = "Basket (" + (count + 3) + ")";
  } else {
    basket.innerText = "Basket (3)";
  }
} else {
  basket.innerText = "Basket (3)";
}
searchInput.addEventListener("keydown", onPress);
searchButton.addEventListener("click", toggleSearch);
function getWidth() {
  return window.innerWidth || document.body.clientWidth;
}
function toggleSearch(e) {
  searchToggle.checked = !searchToggle.checked;
  if (!searchToggle.checked && searchInput.value !== "") {
    let link = document.createElement("a");
    link.setAttribute("href", "2_category-all.html");
    link.click();
  } else if (searchToggle.checked) {
    if (getWidth() <= 768) {
      shiftSearch();
    }
    searchInput.style.visibility = "visible";
    searchButton.style.background = "#606060";
    let oldImg = searchButton.querySelector("img");
    let newImg = document.createElement("img");
    newImg.src = "img/icons/search.png";
    newImg.alt = "Search";
    newImg.title = "Search";
    searchButton.replaceChild(newImg, oldImg);
    searchInput.focus();
  } else {
    if (getWidth() <= 768) {
      unshiftSearch();
    }
    hideInput();
  }
}
function shiftSearch() {
  search.className += " shiftedSearch";
  searchInput.className += " shiftedInput";
  searchButton.className += " shiftedInputBtn";
  document.querySelector("nav ul").style.marginTop = "75px";
}
function unshiftSearch() {
  search.className = search.className.slice(0, -14);
  searchInput.className = searchInput.className.slice(0, -13);
  searchButton.className = searchButton.className.slice(0, -16);
  document.querySelector("nav ul").style.marginTop = "20px";
}
function hideInput() {
  let oldImg = searchButton.querySelector("img");
  searchInput.style.visibility = "hidden";
  searchButton.style.background = "white";
  let newImg = document.createElement("img");
  newImg.src = "img/icons/searchDark.png";
  newImg.alt = "Search";
  newImg.title = "Search";
  searchButton.replaceChild(newImg, oldImg);
}
function onPress(e) {
  if (e.key === "Enter") {
    let link = document.createElement("a");
    link.setAttribute("href", "2_category-all.html");
    link.setAttribute("type", "hidden");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else if (e.key === "Escape" || e.key === "Esc") {
    searchToggle.checked = !searchToggle.checked;
    if (getWidth() <= 768) {
      unshiftSearch();
    }
    hideInput();
  }
}
