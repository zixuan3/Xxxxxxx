// implement carousel from scratch
const carousel = $('.carousel-section-mFWXw');
const cmsHeroContainers = [...carousel.find('.cmsHeroContainer-gUIdhS')];
const carouselContents = [...carousel.find('.carousel-flex-content-hGXIOq')];
const slideCount = carouselContents.length;

const slideButtons = [...carousel.find('.slide-button-hdopKD')];
for (let i = 1; i <= slideButtons.length; i++) {
  // https://stackoverflow.com/questions/44665117/adding-click-listener-to-an-array-of-jquery-objects
  $(slideButtons[i - 1]).click(() => {
    jumpToSlide(i);
  });
}

const jumpToSlide = (jumpToSlideNum) => {
  clearInterval(carouselInterval);
  pauseVideo();

  slideTo = jumpToSlideNum;
  nextSlide(slideTo);

  if (isPlaying === true) {
    autoPlaySlidesIn5Seconds();
  }
}

const slideButtonSpans = [...carousel.find('.slide-button-span-bzeOpQ')];
for (const slideButtonSpan of slideButtonSpans) {
  slideButtonSpan.classList.add("unvisited");
  slideButtonSpan.classList.remove("visited");
}
const slide_video = document.getElementsByClassName("slide-video-juHCdc");

let currentSlide = 1;
let slideTo = 2;
const nextSlide = (startFrom) => {
  if (startFrom === slideCount + 1) {
    startFrom = 1;
  }
  if (startFrom === 0) {
    startFrom = slideCount;
  }
  var testEvent = new CustomEvent('carousel-section-mFWXw', {'detail': {
    slideNum: startFrom
  }});
  this.dispatchEvent(testEvent);
}

let carouselInterval = setInterval(() => {
  nextSlide(slideTo);
  slideTo += 1;
  if (slideTo > slideCount) {
    slideTo = 1;
  }
}, 5000);

let isPlaying = true;
const buttonWrapper = $('.pause-button-wrapper-jSWYiy');
// button to jump to next slide
const nextArrow = $('.slide-arrow-right-kiWcOt');
// button to jump to previous slide
const prevArrow = $('.slide-arrow-left-cCoBrd');
const playButton = `
  <svg aria-label="Play" fill="#ffffff" role="img" viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg" class="pause-play-svg-ffHQEO">
    <g fill-rule="nonzero">
      <path
        d="M17 .25C7.75.25.25 7.75.25 17S7.75 33.75 17 33.75 33.75 26.25 33.75 17 26.25.25 17 .25zm0 1.5c8.422 0 15.25 6.828 15.25 15.25S25.422 32.25 17 32.25 1.75 25.422 1.75 17 8.578 1.75 17 1.75z">
      </path>
      <path
        d="M15.436 11.411l6.812 5.476a1 1 0 010 1.559l-6.812 5.476a1 1 0 01-1.627-.78V12.192a1 1 0 011.627-.78z">
      </path>
    </g>
  </svg>
`;
 
const pauseButton = `
  <svg aria-label="Pause" fill="#ffffff" role="img" viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg" class="pause-play-svg-ffHQEO">
    <g fill-rule="evenodd">
      <path
        d="M17 .25C7.75.25.25 7.75.25 17S7.75 33.75 17 33.75 33.75 26.25 33.75 17 26.25.25 17 .25zm0 1.5c8.422 0 15.25 6.828 15.25 15.25S25.422 32.25 17 32.25 1.75 25.422 1.75 17 8.578 1.75 17 1.75z">
      </path>
      <g transform="translate(12 11.667)">
        <rect width="2.667" height="12" rx="1"></rect>
        <rect width="2.667" height="12" x="6.333" rx="1"></rect>
      </g>
    </g>
  </svg>
`;

window.addEventListener('carousel-section-mFWXw', function(event) {
  const newSlide = event.detail.slideNum;

  // if the previous contains video, pause
  if (currentSlide == 3 && slide_video != undefined) {
    slide_video[0].pause();
  }
  // if current contains video, play from beginning
  if (newSlide === 3 && slide_video !== undefined && isPlaying === true) {
    slide_video[0].pause();
    slide_video[0].currentTime = 0;
    slide_video[0].play();
  }

  if (newSlide !== currentSlide) {
    // remove active at cmsHeroContainer-gUIdhS of currentSlide
    cmsHeroContainers[currentSlide - 1].classList.remove('active');
    // remove active at carousel-flex-content-hGXIOq of current Slide
    carouselContents[currentSlide - 1].classList.remove('active');
    // add active at cmsHeroContainer-gUIdhS of newSlide
    cmsHeroContainers[newSlide - 1].classList.add('active');
    // add active at carousel-flex-content-hGXIOq of newSlide
    carouselContents[newSlide - 1].classList.add('active');

    // set indicator to correct classes
    // if newSlide is 3, slide 1 & 2 visited, slide 3 & 4 unvisited, slide 3 active
    for (let i = 1; i <= newSlide - 1; i++) {
      slideButtonSpans[i - 1].classList.remove('unvisited');
      slideButtonSpans[i - 1].classList.add('visited');
    }
    for (let i = newSlide; i <= slideButtonSpans.length; i++) {
      slideButtonSpans[i - 1].classList.remove('visited');
      slideButtonSpans[i - 1].classList.add('unvisited');
    }

    // set slideButtonSpan of newSlide to active for animation
    slideButtonSpans[currentSlide - 1].classList.remove('active');

    if (isPlaying === true) {
      slideButtonSpans[newSlide - 1].classList.add('active');
    }

    // set currentSlide to newSlide
    currentSlide = newSlide;
    console.log('currentSlide:', currentSlide);
  }
});

buttonWrapper.click(() => {
  isPlaying = !isPlaying;
  if (isPlaying === true) {
    console.log('playing');
    // should play, then the button should be pause button
    buttonWrapper.html(pauseButton);
    slideTo = currentSlide;
    slideButtonSpans[slideTo - 1].classList.add('active');
    nextSlide(slideTo);
    
    autoPlaySlidesIn5Seconds();
  } else {
    console.log('paused');
    // should pause, then the button should be play button
    buttonWrapper.html(playButton);
    clearInterval(carouselInterval);
    slideButtonSpans[currentSlide - 1].classList.remove('active');
    pauseVideo();
  }
});

nextArrow.click(() => {
  console.log('next arrow click');
  jumpToSlide(currentSlide + 1);
});

prevArrow.click(() => {
  console.log('prev arrow click');
  jumpToSlide(currentSlide - 1);
});

const autoPlaySlidesIn5Seconds = () => {
  slideTo += 1;
  carouselInterval = setInterval(() => {
    nextSlide(slideTo);
    slideTo += 1;
    if (slideTo > slideCount) {
      slideTo = 1;
    }
  }, 5000);
}

const pauseVideo = () => {
  if (slide_video != undefined) {
    slide_video[0].pause();
    slide_video[0].currentTime = 0;
  }
}
