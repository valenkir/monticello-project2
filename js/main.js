$(() => {
  /*MOBILE NAVIGATION*/
  $(".navbar-list__mobile-links").on("click", (event) => {
    $(".navbar-list__links").toggleClass("navbar-list__links--mobile-menu");
    $(".navbar-list__mobile-links").children().css("fill") === "none"
      ? $(".navbar-list__mobile-links").children().css("fill", "#ffff")
      : $(".navbar-list__mobile-links").children().css("fill", "none");
  });

  /*SLIDER IN HEADER*/
  $(".home-header__about-us-slider").slick({
    adaptiveHeight: true,
    appendDots: $(".home-header__dots-container"),
    dots: true,
    zIndex: 1,
    dotsClass: "dots",
    arrows: false,
    customPaging: () => '<a class="dots__item" role="button"></a>',
  });

  /*NEWS CARDS*/
  // const cards = $(".news__card");
  fetch("../assets/test-json/news.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((cardData) => {
        const card = $("<div></div>");
        const cardCover = $(
          `<img src="${cardData.image_url}" alt=${cardData.img_description}/>`
        );
        cardCover.addClass("object-fit-contain");
        const cardTitle = $(
          `<h4 class="fs-m text-uppercase primary-txt-color mt-20 fw-bold">${cardData.title}</h4>`
        );
        card.append(cardCover, cardTitle);
        card.addClass("card");
        $(".news__slider").append(card);
      });
    });
});
