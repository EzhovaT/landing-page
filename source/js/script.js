const mainNav = document.querySelector(".main-nav"),
  taglineSliderWrapper = document.querySelector(".tagline-slider__inner-wrapper"),
  taglineSlider = document.querySelector(".tagline-slider"),
  optionsSlider = document.querySelector(".options"),
  optionsSliderWrapper = document.querySelector(".options__inner-wrapper"),
  pricesSlider = document.querySelector(".prices"),
  pricesSliderWrappe = document.querySelector(".prices__inner-wrapper");


//open mobile menu

mainNav.addEventListener("click", (e) => {
  if (e.target.classList.contains("main-nav__btn")) {
    mainNav.classList.toggle("main-nav_closed-menu");
    e.target.classList.toggle('main-nav__btn_open-menu')
  }
});


//slider

let offsetLeft = 0;
const SLIDER_CARD_WIDTH = 150;

const nextSlide = (step, sliderTapeLength, sliderName) => {
  offsetLeft += step;
  if (offsetLeft > sliderTapeLength) {
    offsetLeft = 0;
  }
  sliderName.style.left = -offsetLeft + "px";
};

const prevSlide = (step, sliderTapeLength, sliderName) => {
  offsetLeft -= step;
  if (offsetLeft < 0) {
    offsetLeft = sliderTapeLength;
  }
  sliderName.style.left = -offsetLeft + "px";
};

taglineSlider.addEventListener("click", (e) => {
  if (e.target.classList.contains("tagline-slider__btn-next")) {
    nextSlide(150, 600, taglineSliderWrapper);
  } else if (e.target.classList.contains("tagline-slider__btn-prev")) {
    prevSlide(150, 600, taglineSliderWrapper);
  }
});

optionsSlider.addEventListener("click", (e) => {
  if (e.target.classList.contains("options__btn-next")) {
    nextSlide(280, 560, optionsSliderWrapper);
  } else if (e.target.classList.contains("options__btn-prev")) {
    prevSlide(280, 560, optionsSliderWrapper);
  }
});

pricesSlider.addEventListener("click", (e) => {
  if (e.target.classList.contains("prices__btn-next")) {
    nextSlide(243, 486, pricesSliderWrappe);
  } else if (e.target.classList.contains("prices__btn-prev")) {
    prevSlide(243, 486, pricesSliderWrappe);
  }
});

//scroll page

const taglineLink = document.querySelector(".tagline__link-price");

taglineLink.addEventListener("click", function (e) {
  e.preventDefault();
  const blockID = taglineLink.getAttribute("href");
  document.querySelector(blockID).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

//Learn more

const advantages = document.querySelectorAll(".advantages__link");

advantages.forEach((element) => {
  element.addEventListener("click", function (e) {
    if (element === e.target) {
      e.preventDefault();
      const previousElement = element.previousSibling;
      previousElement.classList.remove("visually-hidden");
      element.remove();
    }
  });
});
