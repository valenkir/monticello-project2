import { Map, Marker } from "./classes/map.js";
import { DataService } from "./classes/dataService.js";
import { NewsCard } from "./classes/newsCard.js";

const isValidNameField = (nameValue) =>
  nameValue.length >= 2 && nameValue.trim() !== "";
const isValidEmailField = (emailValue) =>
  emailValue.trim() !== "" &&
  String(emailValue)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

/*MAP*/
const createStaticMap = () => {
  const center = [-73.935242, 40.73061];
  const style =
    "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAVnNXRGpENmlBemRPbHNKYjtkZmM2MTU4Yi0xNzJjLTQyMTMtYjAxNi1lNjcxNWIyNTc0ZjY=/drafts/0.json?key=cCWixuY0nWKANcaBVjgX2VaA5L0M7rrc";
  const map = new Map(center, 10, style, false);
  const marker = new Marker(map.getMap(), "marker", center);
  marker.createMarker();
};

createStaticMap();

$(() => {
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
  const createCards = () => {
    const url = "./assets/test-json/news.json";
    const dataService = new DataService(url);
    dataService.fetchData().then(() => {
      const cards = new NewsCard(dataService, ".news__slider");
      cards.processData();

      //NEW SLIDER
      $(".news__slider").slick({
        variableWidth: true,
        arrows: false,
        mobileFirst: true,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
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
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      });
    });
  };

  createCards();

  /*GALLERY*/
  fetch("./assets/test-json/gallery.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((image, index) => {
        if (index < 5) {
          const imgElem = $(`<img src=${image.url} alt=${image.name}/>`);
          if (window.screen.width >= 550) {
            index === 0
              ? imgElem.addClass("img-1")
              : imgElem.addClass(`img-${index + 1}`);
          } else {
            imgElem.addClass("gallery-img-block__img");
          }

          $(".gallery-img-block").append(imgElem);
        }
      });
    });

  $(".gallery-img-block_btn").on(
    "click",
    () => (window.location.href = "./pages/gallery.html")
  );

  /*CONTACT FORM*/
  const isContactFormValid = () => {
    const nameValue = $(".map-and-contacts__form-input-name").val();
    const emailValue = $(".map-and-contacts__form-input-email").val();
    return isValidNameField(nameValue) && isValidEmailField(emailValue);
  };

  $(".map-and-contacts__form-input-name").on("input", (event) => {
    const inputValue = $(event.target).val();
    if (inputValue.length >= 2 && inputValue.trim() !== "") {
      $(".map-and-contacts__form-input-name-error").addClass("d-none");
    } else {
      $(".map-and-contacts__form-input-name-error").removeClass("d-none");
      $(event.target).val().length < 2
        ? $(".map-and-contacts__form-input-name-error").text(
            "Enter at least 2 characters"
          )
        : $(".map-and-contacts__form-input-name-error").text(
            "The Full name field cannot be empty"
          );
    }
  });

  $(".map-and-contacts__form-input-email").on("input", (event) => {
    const inputValue = $(event.target).val();
    if (!isValidEmailField(inputValue)) {
      $(".map-and-contacts__form-input-email-error").removeClass("d-none");
      $(".map-and-contacts__form-input-email-error").text(
        "Enter a valid email"
      );
    } else {
      $(".map-and-contacts__form-input-email-error").addClass("d-none");
    }
  });

  $(".map-and-contacts__form").on("submit", (event) => {
    event.preventDefault();
    if (isContactFormValid()) {
      $(".success-message").show(1000);
      setTimeout(() => {
        $(".success-message").hide(1000);
      }, 3000);
      $(".map-and-contacts__form-input-name").val("");
      $(".map-and-contacts__form-input-email").val("");
    }
  });
});
