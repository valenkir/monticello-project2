const parseDate = (date) => {
  const day = date.toLocaleString("default", {
    day: "numeric",
  });
  const month = date.toLocaleString("default", {
    month: "short",
  });
  const year = date.toLocaleString("default", { year: "numeric" });

  return `${day} ${month} ${year}`;
};

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
    dotsClass: "dots-header",
    arrows: false,
    customPaging: () => '<a class="dots__item" role="button"></a>',
  });

  /*NEWS CARDS*/
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

        //CARD TEXT
        const cardInfo = $("<div></div>");
        cardInfo.addClass("card-info");
        const cardCover = $(
          `<img src="${cardData.image_url}" alt=${cardData.img_description}/>`
        );
        cardCover.addClass("object-fit-contain");
        const cardTitle = $(`<h4>${cardData.title}</h4>`);
        cardTitle.addClass("fs-m text-uppercase primary-txt-color fw-bold");
        const cardDescription = $(`<p>${cardData.snippet}</p>`);
        cardDescription.addClass("primary-txt-color mt-20 secondary-font");

        //AUTHOR INFO
        const cardAuthorContainer = $("<div></div>");
        cardAuthorContainer.addClass("card-author-container mt-40");
        const cardAuthorImg = $(
          `<img src="${cardData.author_img_url}" alt="${cardData.author}'s image"/>`
        );
        cardAuthorImg.addClass("card-author-img");
        const cardAuthorName = $(`<span>${cardData.author}</span>`);
        cardAuthorName.addClass(
          "card-author-name text-uppercase primary-txt-color"
        );
        const cardPostDate = $(
          `<span>${parseDate(new Date(cardData.published_at))}</span>`
        );
        cardPostDate.addClass("card-post-date");

        cardAuthorContainer.append(cardAuthorImg, cardAuthorName, cardPostDate);
        cardInfo.append(cardTitle, cardDescription, cardAuthorContainer);
        card.append(cardCover, cardInfo);
        card.addClass("card");
        $(".news__slider").append(card);
      });

      /*NEWS SLIDER*/
      $(".news__slider").slick({
        variableWidth: true,
        arrows: false,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: true,
              prevArrow: $(".news__slider-arrow--left"),
              nextArrow: $(".news__slider-arrow--right"),
              appendDots: $(".news__slider-dots"),
              dots: true,
              dotsClass: "dots-news",
              customPaging: () => '<a class="dots__item" role="button"></a>',
            },
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      });
    });
});
