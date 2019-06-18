const slider = document.querySelector(".signup__slider");
const sliderMovingPart = document.querySelector(".slider__container");
const signupButton = document.querySelector(".signup__button");
const sliderLeft = document.querySelector(".slider__button--left");
const sliderRight = document.querySelector(".slider__button--right");
const email = document.querySelector(".signup__email");
const emailValidationDiv = document.querySelector(".form__validationDiv");
emailValidationDiv.style.display = "none";
sliderRight.addEventListener("click", moveSliderRight);
sliderLeft.addEventListener("click", moveSliderLeft);
signupButton.addEventListener("click", checkEmail);
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
function checkEmail(e) {
  e.preventDefault();
  if (validateEmail()) {
    emailValidationDiv.setAttribute(
      "class",
      "form__validationDiv form__validationDiv--valid"
    );
    emailValidationDiv.querySelector("p").innerText =
      "We added you to our list";
  } else {
    emailValidationDiv.setAttribute(
      "class",
      "form__validationDiv form__validationDiv--invalid"
    );
    emailValidationDiv.querySelector("p").innerText =
      "Please enter valid e-mail";
  }

  emailValidationDiv.style.display = "block";
}
function validateEmail() {
  let mail = email.value || "";
  let regex = /[\w,\d]+@[\w,\d]+\.[\w,\d]+/;
  return regex.test(mail);
}
