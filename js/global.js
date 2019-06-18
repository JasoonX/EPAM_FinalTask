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
}
searchInput.addEventListener("keydown", onPress);
searchInput.addEventListener("keypress", onPress);
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
    searchButtonImg.setAttribute("src", "img/icons/search.png");
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
  searchInput.style.visibility = "hidden";
  searchButton.style.background = "white";
  searchButtonImg.setAttribute("src", "img/icons/searchDark.png");
}
function onPress(e) {
  if (e.key === "Enter") {
    let link = document.createElement("a");
    link.setAttribute("href", "2_category-all.html");
    link.click();
  } else if (e.key === "Escape" || e.key === "Esc") {
    searchToggle.checked = !searchToggle.checked;
    hideInput();
  }
}
