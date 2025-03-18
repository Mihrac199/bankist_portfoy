

'use strict';

// ELEMENTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const allSections = document.querySelectorAll(".section");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const slideBtnRight = document.querySelector(".slider__btn--right");
const slideBtnLeft = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");

const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allButtons = document.getElementsByTagName("button");

const h1 = document.querySelector("h1");


// FUNCTİONS
function openModal(element) {
  element.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* function handleHover(element, opacity) {
  if (element.target.tagName === "A") {
    const link = element.target;

    const navContainer = link.closest(".nav");
    const logo = navContainer.querySelector("img");
    const siblings = navContainer.querySelectorAll(".nav__link");

    siblings.forEach(function (sibling) {
      if (sibling !== link) {
        sibling.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
}; */


function handleHoverBind(element) {
  if (element.target.tagName === "A") {
    const link = element.target;

    const navContainer = link.closest(".nav");
    const logo = navContainer.querySelector("img");
    const siblings = navContainer.querySelectorAll(".nav__link");

    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

function obsCallbackNav(entries, observer) {
  entries.forEach(function (entry) {

    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    }
    else {
      nav.classList.remove("sticky");
    }

  });
};

function obsCallbackSections(entries, observer) {

  const [entry] = entries;

  /* FİRST METHOD
  if (entry.isIntersecting) entry.target.classList.remove("section--hidden"); */

  // SECOND METHOD
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

function obsCallbackLoadİmg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // REPLACE İMG
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

function slideLoop(slides) {

  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * i}%)`;
  });

};

function goToSlide(slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

function slideLoopBtn(slides) {

  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - countBtnSlide)}%)`;
  });

};

function nextSlide() {
  if (countBtnSlide === maxSlide) countBtnSlide = 0;
  else countBtnSlide++;
  slideLoopBtn(slides);

  activeDot(countBtnSlide);
};

function prevSlide() {
  if (countBtnSlide === 0) countBtnSlide = maxSlide;
  else countBtnSlide--;
  slideLoopBtn(slides);

  activeDot(countBtnSlide);
};

function createDots() {

  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML("beforeend",
      `<button class="dots__dot "data-slide="${i}"></button>`
    )
  });

};

function activeDot(slide) {

  document.querySelectorAll(".dots__dot").forEach(function (element) {
    element.classList.remove("dots__dot--active");
  });

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};


btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (element) {
  if (element.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// ANİMATİON TRANSİTİON
const optionsSections = {
  root: null,
  threshold: 0.15,
};

const observerSections = new IntersectionObserver(obsCallbackSections, optionsSections);
allSections.forEach(function (section) {
  observerSections.observe(section);
  section.classList.add("section--hidden");
});


// ANİMATİON LOADİNG İMAGE
const loadingİmages = document.querySelectorAll("img[data-src]");
const optionsLoadİmg = {
  root: null,
  threshold: 0.20,
  rootMargin: "-200px",
};

const observerLoadİmg = new IntersectionObserver(obsCallbackLoadİmg, optionsLoadİmg);
loadingİmages.forEach(img => {
  observerLoadİmg.observe(img);
});


// SCROLL TO "Nav"
navLinks.addEventListener("click", function (element) {

  element.preventDefault();

  const id = element.target.getAttribute("href");

  if (element.target.tagName === "A") {
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});


// SCROLL TO FİXED "nav"
const navHeight = nav.getBoundingClientRect().height;
const optionsNav = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

const observerNav = new IntersectionObserver(obsCallbackNav, optionsNav);
observerNav.observe(header);


// SCROLL TO "Learn more ↓"
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});


// ANİMATİON MOUSEOVER "Nav"
/* nav.addEventListener("mouseover", function (element) {
  handleHover(element, 0.5);
}); */
// ANİMATİON MOUSEOVER "Nav" .bind METHOD
nav.addEventListener("mouseover", handleHoverBind.bind(0.5));


// ANİMATİON MOUSEOUT "Nav"
/* nav.addEventListener("mouseout", function (element) {
  handleHover(element, 1);
}); */
// ANİMATİON MOUSEOUT "Nav" .bind METHOD
nav.addEventListener("mouseout", handleHoverBind.bind(1));


// SECTİON 2
tabsContainer.addEventListener("click", function (element) {
  const clicked = element.target.closest(".operations__tab");

  // ACTİVE TAB
  if (!clicked) return;

  tabs.forEach(function (element) {
    element.classList.remove("operations__tab--active");
  });

  clicked.classList.add("operations__tab--active");

  // ACTİVE AREA
  tabsContent.forEach(function (element) {
    element.classList.remove("operations__content--active");
  });

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});


// SECTİON 3
slideLoop(slides);
let countBtnSlide = 0;
const maxSlide = (slides.length - 1);

// SECTİON 3 BUTTON RİGHT
slideBtnRight.addEventListener("click", nextSlide);

// SECTİON 3 BUTTON LEFT
slideBtnLeft.addEventListener("click", prevSlide);

// SECTİON 3 KEYDOWN RİGHT & LEFT
document.addEventListener("keydown", function (element) {
  if (element.key === "ArrowRight") nextSlide();
  if (element.key === "ArrowLeft") prevSlide();
});

createDots();
activeDot(0);
dotContainer.addEventListener("click", function (element) {

  if (element.target.tagName === "BUTTON") {
    const slide = element.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  }

});