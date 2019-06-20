"use strict";
const slider = document.querySelector(".lookbook__container");
const sliderMovingPart = document.querySelector(".slider__container");
const smallImgs = document.querySelector(".images__smallImgs");
const imgsContainer = document.querySelector(".images__container");
const sliderRight = document.querySelector(".slider__button--right");
const sliderLeft = document.querySelector(".slider__button--left");
const sizeBtns = document.querySelector(".info__sizes");
const addBtn = document.querySelector(".button--accent.medium.info__addbtn");
const modelName = document.querySelector(".info__container h2");
smallImgs.addEventListener("click", switchImages);
sizeBtns.addEventListener("click", pickSize);
sliderLeft.addEventListener("click", moveSliderLeft);
sliderRight.addEventListener("click", moveSliderRight);
addBtn.addEventListener("click", addToCart);
function switchImages(e) {
  if (e.target.nodeName === "BUTTON") {
    let containerStyle = window.getComputedStyle(imgsContainer);
    let smallImgStyle = window.getComputedStyle(e.target.parentNode);
    let smallImgNo = smallImgStyle
      .getPropertyValue("background-image")
      .slice(-7, -6);
    if (isNaN(parseInt(smallImgNo))) {
      smallImgNo = smallImgStyle
        .getPropertyValue("background-image")
        .slice(-6, -5);
    }
    let bigImgNo = containerStyle
      .getPropertyValue("background-image")
      .slice(-7, -6);
    if (isNaN(parseInt(bigImgNo))) {
      bigImgNo = containerStyle
        .getPropertyValue("background-image")
        .slice(-6, -5);
    }

    e.target.parentNode.style.backgroundImage =
      "url(img/product_images/thumbnail" + bigImgNo + ".jpg)";
    imgsContainer.style.backgroundImage =
      "url(img/product_images/productimage" + smallImgNo + ".jpg)";
  }
}
function pickSize(e) {
  if (e.target.nodeName === "BUTTON") {
    [].forEach.call(e.target.parentNode.children, function(value) {
      if (value.getAttribute("class") === "sizebtnChosen") {
        value.setAttribute("class", "sizebtn");
      }
    });
    e.target.setAttribute("class", "sizebtnChosen");
  }
}
function addToCart(e) {
  let cart = localStorage.getItem("cart");
  let model = modelName.innerText;
  let size;
  if (document.querySelector(".sizebtnChosen")) {
    size = document.querySelector(".sizebtnChosen").innerText;
    if (cart) {
      cart = JSON.parse(cart);
      let isNew =
        cart.filter(function(value) {
          return value.model === model && value.size === size;
        }).length === 0;
      if (isNew) {
        cart.push({
          model: model,
          size: size,
          count: 1
        });
      } else {
        cart.forEach(function(value) {
          if (value.model === model && value.size === size) {
            value.count++;
            return;
          }
        });
      }
    } else {
      cart = [];
      cart.push({
        model: model,
        size: size,
        count: 1
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.removeItem("currentSize");

    e.target.style.backgroundColor = "green";
    e.target.innerText = "PRODUCT ADDED";
    setTimeout(function() {
      e.target.style.backgroundColor = "#f68236";
      e.target.innerText = "ADD TO CART";
    }, 1000);
  }
  updateBasket();
}
function updateBasket() {
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let count = cart.reduce(function(prev, cur) {
      return prev + cur.count;
    }, 0);
    document.querySelector(".basket p").innerText =
      "Basket (" + (count + 3) + ")";
  }
}
function moveSliderLeft() {
  if (parseInt(sliderMovingPart.style.left) !== 0)
    sliderMovingPart.style.left =
      parseInt(sliderMovingPart.style.left) + 200 + "px";
}
function moveSliderRight() {
  if (sliderMovingPart.style.left == "") sliderMovingPart.style.left = "-200px";
  else if (slider.offsetWidth - parseInt(sliderMovingPart.style.left) < 1600)
    sliderMovingPart.style.left =
      parseInt(sliderMovingPart.style.left) - 200 + "px";
}
