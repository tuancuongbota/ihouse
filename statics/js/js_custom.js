$(document).ready(function(){
$('.slick-slideshow').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: false,
    autoplay: false,
    autoplaySpeed: 10000,
    customPaging: (_slider, i) => '<button type="button" data-role="none" role="button" tabindex="0">' + (i + 1) + '</button><svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16"> <circle class="arc" cx="8" cy="8" r="5.5" fill="none" stroke-dasharray="0, 90" stroke-dashoffset="5" transform="rotate(-90 8 8)" stroke="#FFF" stroke-opacity="1" stroke-width="1.5px" style=""></circle> <circle cx="8" cy="8" r="2.5" fill="#FFF"></circle> </svg></div>'
  });
});