const searchButton = document.querySelector(".searchBtn");
const searchButtonImg = searchButton.querySelector("img");
const searchInput = document.querySelector(".searchInput");
const searchToggle = document.querySelector(".toggleSearchCheck");
function toggleSearch(e) {
  searchToggle.checked = !searchToggle.checked;

  if (!searchToggle.checked && searchInput.value !== "") {
    let link = document.createElement("a");
    link.setAttribute("href", "2_category-all.html");
    link.click();
  } else if (searchToggle.checked) {
    searchInput.style.visibility = "visible";
    searchButton.style.background = "#606060";
    searchButtonImg.setAttribute("src", "img/icons/search.png");
  } else {
    searchInput.style.visibility = "hidden";
    searchButton.style.background = "white";
    searchButtonImg.setAttribute("src", "img/icons/searchDark.png");
  }
}
searchButton.addEventListener("click", toggleSearch);
