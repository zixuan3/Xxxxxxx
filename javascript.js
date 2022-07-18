const logo = $('a.logo-link-flWoNK');
const navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024 = $('.larger1024');
const smallLogo = `
  <svg role="img" width="25" height="36" viewBox="0 0 25 36"
    data-test-id="brandLogo" class="logo-svg-gLYEcu">
    <title>Brand Logo</title>
    <path
      d="M 0 0 l 30 0 l 0 45 l -15 -20 l -15 20 L 0 0">
    </path>
  </svg>
`;
const largeLogo = `
  <svg role="img" width="156" height="46" viewBox="0 0 156 46"
    data-test-id="brandLogo" class="logo-svg-largeScreen-euZINs">
    <title>Brand Logo</title>
    <path
      d="M 0 0 l 30 0 l 0 45 l -15 -20 l -15 20 L 0 0 m 45 15 L 45 30 L 55 30 L 55 25 L 50 25 L 50 15 L 45 15 M 60 15 L 60 30 L 70 30 L 70 15 L 67 15 L 67 27 L 63 27 L 63 18 L 67 18 L 67 15 L 60 15 M 85 15 L 85 18 L 78 18 L 78 27 L 82 27 L 82 23 L 85 23 L 85 30 L 75 30 L 75 15 M 90 15 L 90 30 L 100 30 L 100 27 L 93 27 L 93 18 L 97 18 L 97 27 L 100 27 L 100 15 Z">
    </path>
  </svg>
`;
// check resize at start
const curWidth = $(this).width();
if ((curWidth >= 768 && curWidth <= 1024) || (curWidth >= 1280)) {
  logo.html(largeLogo);
} else {
  logo.html(smallLogo);
}
if (curWidth < 1024) {
  navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.hide();
} else {
  navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.show();
}

// changes logos when screen width changes
$(window).resize(function() {
  const curWidth = $(this).width();
  if ((curWidth >= 768 && curWidth <= 1024) || (curWidth >= 1280)) {
    logo.html(largeLogo);
  } else {
    logo.html(smallLogo);
  }

  if (curWidth < 1024) {
    navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.hide();
  } else {
    navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.show();
  }
});

// let carousel indicators change style as time goes
const myCarousel = document.getElementById("carouselExampleIndicators");
const carouselIndicators = myCarousel.querySelectorAll(
  ".carousel-indicators button span"
);
for (const carouselIndicator of carouselIndicators) {
  carouselIndicator.classList.add("unvisited");
  carouselIndicator.classList.remove("visited");
}
const slide_video = document.getElementsByClassName("slide-video-juHCdc");
let intervalID;
const carousel = new bootstrap.Carousel(myCarousel);

window.addEventListener("load", function () {
  fillCarouselIndicator(1);
});

myCarousel.addEventListener("slide.bs.carousel", function (e) {
  let index = e.to;
  if (index == 0) {
    for (const carouselIndicator of carouselIndicators) {
      
      carouselIndicator.classList.add("unvisited");
      carouselIndicator.classList.remove("visited");
      carouselIndicator.style.setProperty('--width', 0 + '%');
    }
  }
  fillCarouselIndicator(++index);
});

function fillCarouselIndicator(index) {
  // remove .active class from .carousel-flex-content-hGXIOq class
  const prev_active = document.querySelector(".carousel-flex-content-hGXIOq.active");
  prev_active.classList.remove("active");
  // add .active class to current .carousel-flex-content-hGXIOq class inside the div of .carousel-item .active class
  const all_carousel_contents = document.querySelectorAll(".carousel-flex-content-hGXIOq");
  let content_index = 1;
  for (const carousel_content of all_carousel_contents) {
    if (content_index == index) {
      carousel_content.classList.add("active");
    }
    content_index++;
  }

  if (slide_video != null) {
    if (index != 3) {
      slide_video[0].pause();
    } else {
      slide_video[0].currentTime = 0;
      slide_video[0].play();
    }
  }

  let iter = 1;
  for (const carouselIndicator of carouselIndicators) {
    if (iter < index) {
      carouselIndicator.classList.add("visited");
      carouselIndicator.classList.remove("unvisited");
      carouselIndicator.style.setProperty('--width', '100%');
    } else {
      carouselIndicator.classList.add("unvisited");
      carouselIndicator.classList.remove("visited");
      carouselIndicator.style.setProperty('--width', '0%');
    }
    iter++;
  }

  clearInterval(intervalID);
  carousel.pause();

  let i = 0;
  intervalID = setInterval(function () {
    i++;
    var style = myCarousel.querySelector('.carousel-indicators .active span').style;
    style.setProperty('--width', i + '%');
    if (i >= 100) {
      carouselIndicators[index-1].classList.remove("unvisited");
      carouselIndicators[index-1].classList.add("visited");
      carousel.next();
    }
  }, 50);
}



// a javascript function that toggles whether the vertical scrollbar exists
let scrollEnabled = true;
const body = document.body;
function toggleScrollBar() {
  scrollEnabled = !scrollEnabled;
  if (scrollEnabled) {
    setTimeout(() => {
      body.style.overflowY = "scroll";
    }, 500);
  } else {
    setTimeout(() => {
      body.style.overflowY = "hidden";
    }, 900);
  }
}
