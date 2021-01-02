let slideIndex = 0;
let myTimer;
let slideshowContainer;
const intervalMs = 4000;

window.addEventListener("load", () => {
    showSlides(slideIndex);
    myTimer = setInterval(() => nextSlide(true), intervalMs);

    slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];

    slideshowContainer.addEventListener('mouseenter', pause)
    slideshowContainer.addEventListener('mouseleave', resume)
});

const nextSlide = (ascend) => {
    clearInterval(myTimer);
    if (ascend) {
        showSlides(slideIndex += 1);
    } else {
        showSlides(slideIndex -= 1);
    }

    myTimer = setInterval(() => nextSlide(true), intervalMs);
};

const currentSlide = (n) => {
    clearInterval(myTimer);
    myTimer = setInterval(() => nextSlide(true), intervalMs);
    showSlides(slideIndex = n);
};

const showSlides = (n) => {
    let slides = document.getElementsByClassName("home-slide");
    let dots = document.getElementsByClassName("dot");

    if (n >= slides.length) { slideIndex = 0}
    if (n < 0) {slideIndex = slides.length - 1}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
};

const pause = () => {
    clearInterval(myTimer);
};

const resume = () => {
    clearInterval(myTimer);
    myTimer = setInterval(() => nextSlide(slideIndex), intervalMs);
};
