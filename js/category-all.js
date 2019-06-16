const sliderMovingPart = document.querySelector(".slider__container");

document
  .querySelector(".slider__button--right")
  .addEventListener("click", moveSliderRight);

document
  .querySelector(".slider__button--left")
  .addEventListener("click", moveSliderLeft);

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
