"use strict";
const slider = document.querySelector(".lookbook__container");
const sliderMovingPart = document.querySelector(".slider__container");

const sliderRight = document.querySelector(".slider__button--right");
const sliderLeft = document.querySelector(".slider__button--left");
sliderRight.addEventListener("click", moveSliderRight);
sliderLeft.addEventListener("click", moveSliderLeft);

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
