const mainNav = document.querySelector(".main-nav"),
  taglineSliderWrapper = document.querySelector(".tagline-slider__slider-tape"),
  taglineSlider = document.querySelector(".tagline-slider__inner-wrapper"),
  optionsSlider = document.querySelector(".options__inner-wrapper"),
  optionsSliderWrapper = document.querySelector(".options__slider-tape"),
  pricesSlider = document.querySelector(".prices__inner-wrapper"),
  pricesSliderWrappe = document.querySelector(".prices__slider-tape"),
  popupOpeningBtn = document.querySelectorAll(".btn-start"),
  page = document.querySelector(".page"),
  form =  document.getElementById("popup__form"),
  submitBtn = form.submit,
  productPlans = document.querySelectorAll("input[name='productPlan'");


//open mobile menu

mainNav.addEventListener("click", (e) => {
  if (e.target.classList.contains("main-nav__btn")) {
    mainNav.classList.toggle("main-nav_closed-menu");
    e.target.classList.toggle('main-nav__btn_open-menu')
  }
});

//popup
let unlock = true;

if (popupOpeningBtn.length > 0) {
  for (let i = 0; i < popupOpeningBtn.length; i++) {
    const popupLink = popupOpeningBtn[i];
    popupLink.addEventListener('click', (e) => {
      const currentPopup = document.getElementById('popup-call');
      popupOpen(currentPopup);
    })
  }
}

function popupOpen(currentPopup) {
  if(currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', (e) => {
      if(!e.target.closest('.popup__content-wrapper')) {
        popupClose(e.target.closest('.popup'));
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  page.classList.add('lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, 800);
}

function bodyUnLock() {
  setTimeout(function() {
    page.classList.remove('lock');
  }, 800);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, 800);
}

// submitBtn.addEventListener('click', validateForm)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const successPopup = document.getElementById('popup-success');
  popupOpen(successPopup);
})
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
    nextSlide(140, 600, taglineSliderWrapper);
  } else if (e.target.classList.contains("tagline-slider__btn-prev")) {
    prevSlide(140, 600, taglineSliderWrapper);
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
    nextSlide(245, 510, pricesSliderWrappe);
  } else if (e.target.classList.contains("prices__btn-prev")) {
    prevSlide(245, 510, pricesSliderWrappe);
  }
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


// Product

productPlans.forEach(element => {
  const cards = document.querySelectorAll("p.price-card__price");
  const yearlyPlan = [
    '<b>Free</b>',
    '<b>$29</b>/month',
    '<b>$49</b>/month'
  ];

  const monthlyPlan = [
    '<b>Free</b>',
    '<b>$10</b>/month',
    '<b>$20</b>/month'
  ];

  element.addEventListener('change', (e) => {
    let plan;
    if(e.target.id === 'Yearly') {
      plan = yearlyPlan;
    } else {
      plan = monthlyPlan;
    }
    for (let index = 0; index < cards.length; index++) {
      cards[index].innerHTML = plan[index];
    }
  })
});

