$(() => {
  /*MOBILE NAVIGATION*/
  $(".navbar-list__mobile-links").on("click", (event) => {
    $(".navbar-list__links").toggleClass("navbar-list__links--mobile-menu");
    $(".navbar-list__mobile-links").children().css("fill") === "none"
      ? $(".navbar-list__mobile-links").children().css("fill", "#ffff")
      : $(".navbar-list__mobile-links").children().css("fill", "none");
  });

  $(".home-header__about-us-slider").slick({
    adaptiveHeight: true,
    appendDots: $(".home-header__dots-container"),
    dots: true,
    zIndex: 1,
    dotsClass: "dots",
    arrows: false,
    customPaging: () => '<a class="dots__item" role="button"></a>',
  });
});
