import { Map, Marker } from "./classes/map.js";
import { DataService } from "./classes/dataService.js";
import { NewsCard } from "./classes/newsCard.js";
import { ContactForm } from "./classes/contactForm.js";
import { Gallery } from "./classes/galleryClass.js";

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
            breakpoint: 1200,
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
  const createGallery = () => {
    const url = "./assets/test-json/gallery.json";
    const dataService = new DataService(url);
    dataService.fetchData().then(() => {
      const landingGallery = new Gallery(
        dataService,
        ".gallery-img-block",
        ".gallery-img-block_btn"
      );

      landingGallery.showPhotos();
      landingGallery.handleShowMoreBtn();
    });
  };

  createGallery();

  /*CONTACT FORM*/
  const contactFormElems = {
    nameField: ".map-and-contacts__form-input-name",
    emailField: ".map-and-contacts__form-input-email",
    nameFieldError: ".map-and-contacts__form-input-name-error",
    emailFieldError: ".map-and-contacts__form-input-email-error",
    form: ".map-and-contacts__form",
    successMessage: ".success-message",
  };

  const handleContactForm = () => {
    const contactForm = new ContactForm(contactFormElems);
    contactForm.validateNameOnInput();
    contactForm.validateEmailOnInput();
    contactForm.showSuccessMessage();
  };

  handleContactForm();
});
