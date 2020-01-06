const StaticItemSmoothScroll = function(target, duration) {
  var target = document.getElementById(target);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  //   http://gizma.com/easing/
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return (c / 2) * (Math.sqrt(1 - t * t) + 1) + b;
  }

  requestAnimationFrame(animation);
};

export default StaticItemSmoothScroll;
