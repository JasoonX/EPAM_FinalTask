const sliderMovingPart = document.querySelector(".slider__container");
const smallImgs = document.querySelector(".images__smallImgs");
const imgsContainer = document.querySelector(".images__container");
const sliderRight = document.querySelector(".slider__button--right");
const sliderLeft = document.querySelector(".slider__button--left");
const sizeBtns = document.querySelector(".info__sizes");
smallImgs.addEventListener("click", switchImages);
sizeBtns.addEventListener("click", pickSize);
sliderLeft.addEventListener("click", moveSliderLeft);
sliderRight.addEventListener("click", moveSliderRight);
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
function switchImages(e) {
  if (e.target.nodeName === "BUTTON") {
    let containerStyle = window.getComputedStyle(imgsContainer);
    let smallImgStyle = window.getComputedStyle(e.target.parentNode);
    let smallImgNo = smallImgStyle
      .getPropertyValue("background-image")
      .slice(-7, -6);
    let bigImgNo = containerStyle
      .getPropertyValue("background-image")
      .slice(-7, -6);
    e.target.parentNode.style.backgroundImage =
      "url(img/product_images/thumbnail" + bigImgNo + ".jpg)";
    imgsContainer.style.backgroundImage =
      "url(img/product_images/productimage" + smallImgNo + ".jpg)";
  }
}
function moveSliderLeft() {
  if (
    parseInt(sliderMovingPart.style.left) >= -400 &&
    parseInt(sliderMovingPart.style.left) < 0
  )
    sliderMovingPart.style.left =
      parseInt(sliderMovingPart.style.left) + 200 + "px";
}
function moveSliderRight() {
  if (sliderMovingPart.style.left == "") sliderMovingPart.style.left = "-200px";
  else if (
    parseInt(sliderMovingPart.style.left) > -400 &&
    parseInt(sliderMovingPart.style.left) <= 0
  )
    sliderMovingPart.style.left =
      parseInt(sliderMovingPart.style.left) - 200 + "px";
}
