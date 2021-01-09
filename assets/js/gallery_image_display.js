let imageInd = 0;
let visibleRangeStart = 0;

const numToShow = 4;

const nextImage = () => {
    imageInd += 1;
    updateShownImage();
};

const prevImage = () => {
    imageInd -= 1;
    updateShownImage();
};

const setImage = (n) => {
    imageInd = n;
    updateShownImage();
};

const nextVisibleRange = () => {
    visibleRangeStart += 1;
    displayImages();
};

const prevVisibleRange = () => {
    visibleRangeStart -= 1;
    displayImages();
};

const updateShownImage = () => {
    let displayPhotos = document.getElementsByClassName('display-photo');
    let displayPhotoContainers = document.getElementsByClassName('display-photo-container');

   imageInd = Math.max(0, Math.min(imageInd, displayPhotos.length - 1));

    for (let i = 0; i < displayPhotos.length; i++) {
        displayPhotos[i].style.display = "none";
        displayPhotoContainers[i].style.height = "0";
        displayPhotos[i].style.height = "0";
    }

    displayPhotos[imageInd].style.display = "block";
    displayPhotos[imageInd].style.height = "";
    displayPhotoContainers[imageInd].style.height = "";
};

const displayImages = () => {
    let galleryPhotos = document.getElementsByClassName('gallery-photo');

    visibleRangeStart = Math.max(0, Math.min(visibleRangeStart, galleryPhotos.length - numToShow - 1));

    for (let i = 0; i < galleryPhotos.length; i++) {
        galleryPhotos[i].style.display = "none";
    }

    for (let i = visibleRangeStart; i <= visibleRangeStart + numToShow; ++i) {
        galleryPhotos[i].style.display = "block";
    }
};

window.addEventListener("load", () => {
    let displayPhotos = document.getElementById("display-photos");

    displayPhotos.addEventListener("touchstart", handleTouchStart, false);
    displayPhotos.addEventListener("touchmove", handleTouchMove, false);
});

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            prevImage();
        } else {
            /* right swipe */
            nextImage();
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

updateShownImage();
displayImages();
