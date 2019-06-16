const sliderMove = document.querySelector(".slider__container");
function moveSliderLeft(e) {
  debugger;
  if (
    parseInt(sliderMove.style.left) >= -400 &&
    parseInt(sliderMove.style.left) < 0
  )
    sliderMove.style.left = parseInt(sliderMove.style.left) + 200 + "px";
}
function moveSliderRight(e) {
  debugger;
  if (sliderMove.style.left == "") sliderMove.style.left = "-200px";
  else if (
    parseInt(sliderMove.style.left) > -400 &&
    parseInt(sliderMove.style.left) <= 0
  )
    sliderMove.style.left = parseInt(sliderMove.style.left) - 200 + "px";
}
document
  .querySelector(".slider__button--right")
  .addEventListener("click", moveSliderRight);

document
  .querySelector(".slider__button--left")
  .addEventListener("click", moveSliderLeft);
