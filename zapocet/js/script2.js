$(document).ready(() => {
    $('#myIntroSlideShow .slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        fade: true,
        asNavFor: '#myIntroSlideShow2 .slick'
    });

    $('#myIntroSlideShow2 .slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#myIntroSlideShow .slick',
        dots: true,
        centerMode: true,
    });
})