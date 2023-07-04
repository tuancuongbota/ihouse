$(document).ready(function(){
  var intervalId;

  $('.slick-slideshow').on('init', function(event, slick) {
    startScaleAnimation(slick.currentSlide);
  });

  $('.slick-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    stopScaleAnimation();
  });

  $('.slick-slideshow').on('afterChange', function(event, slick, currentSlide) {
    startScaleAnimation(currentSlide);
  });

  $('.slick-slideshow').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 8000,
    customPaging: (_slider, i) => '<div id="dot' + (i + 1) + '"><svg viewBox="0 0 40 40" class="spinner" width="20" height="20" style="--duration: 15.046667s;"><circle cx="20" cy="20" r="12" class="outer" opacity="0.5"></circle><circle cx="20" cy="20" r="5.5" class="inner" opacity="0.5"></circle></svg></div>'
  });

  function startScaleAnimation(slideIndex) {
    var slideElements = $('.slick-slide');
    var scaleValue = 1; // Giá trị scale ban đầu
    var scaleFactor = 0.0001; // Hệ số vận tốc scale

    intervalId = setInterval(function() {
      scaleValue += scaleFactor;
      slideElements.each(function(index, element) {
        if (index === slideIndex) {
          $(element).css('transform', 'translate3d(0px, 0px, 0px) scale(' + scaleValue + ', ' + scaleValue + ')');
        } else {
          $(element).css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });

      if (scaleValue >= 1.01668) {
        stopScaleAnimation();
      }
    }, 10);
  }

  function stopScaleAnimation() {
    clearInterval(intervalId);
  }
});