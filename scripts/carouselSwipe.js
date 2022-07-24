var mousedownX = 0;
var mouseupX = 0;

var zone = document.getElementById('CarouselZone');

// for desktop, use mouse events to check for swipe
zone.addEventListener('mousedown', function(event) {
    mousedownX = event.screenX;
}, false);

zone.addEventListener('mouseup', function(event) {
    mouseupX = event.screenX;
    console.log('mousedown', mousedownX, 'mouseup', mouseupX);
    handleGesture();
}, false);


// for mobile, use touch events to check for swipe
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

zone.addEventListener('touchstart', function(event) {
    mousedownX = event.targetTouches[0].screenX;
    //console.log('start:', event.targetTouches);
}, false);

zone.addEventListener('touchend', function(event) {
    mouseupX = event.changedTouches[0].screenX;
    //console.log('touchstart', mousedownX, 'touchend', mouseupX);
    handleGesture();
    
    //console.log('end:', event.changedTouches);
}, false);

function handleGesture() {
    if (Math.abs(mousedownX - mouseupX) < 50) return;
    if (mouseupX < mousedownX) {
        console.log('swipe left');
        // swipe left, carousel go next
        jumpToSlide(currentSlide + 1);
    } else if (mouseupX > mousedownX) {
        console.log('swipe right');
        // swipe right, carousel go prev
        jumpToSlide(currentSlide - 1);
    }
}