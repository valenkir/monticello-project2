export class Gallery {
  constructor(dataService, galleryContainer, btn) {
    this.galleryData = dataService;
    this.galleryContainer = galleryContainer;
    this.btn = btn;
  }

  showPhotos() {
    this.galleryData.data.forEach((image, index) => {
      if (index < 5) {
        const imgElem = $(`<img src=${image.url} alt=${image.name}/>`);
        if (window.screen.width >= 550) {
          index === 0
            ? imgElem.addClass("img-1")
            : imgElem.addClass(`img-${index + 1}`);
        } else {
          imgElem.addClass("gallery-img-block__img");
        }

        $(this.galleryContainer).append(imgElem);
      }
    });
  }

  handleShowMoreBtn() {
    $(this.btn).on(
      "click",
      () => (window.location.href = "./pages/gallery.html")
    );
  }
}
