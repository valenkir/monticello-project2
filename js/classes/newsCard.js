export class NewsCard {
  constructor(dataService, cardContainer) {
    this.dataService = dataService;
    this.cardContainer = cardContainer;
  }

  #parseDate = (date) => {
    const day = date.toLocaleString("default", {
      day: "numeric",
    });
    const month = date.toLocaleString("default", {
      month: "short",
    });
    const year = date.toLocaleString("default", { year: "numeric" });

    return `${day} ${month} ${year}`;
  };

  #renderCards(data) {
    data.forEach((cardData) => {
      const card = $("<div></div>");

      //CARD TEXT
      const cardInfo = $("<div></div>");
      cardInfo.addClass("card-info");
      const cardCover = $(
        `<img src="${cardData.image_url}" alt=${cardData.img_description}/>`
      );
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
        `<span>${this.#parseDate(new Date(cardData.published_at))}</span>`
      );
      cardPostDate.addClass("card-post-date");

      cardAuthorContainer.append(cardAuthorImg, cardAuthorName, cardPostDate);
      cardInfo.append(cardTitle, cardDescription, cardAuthorContainer);
      card.append(cardCover, cardInfo);
      card.addClass("card");
      $(this.cardContainer).append(card);
    });
  }

  processData() {
    const cardData = this.dataService.getData();
    if (cardData.length) {
      this.#renderCards(cardData);
    } else {
      console.log("No available posts");
    }
  }
}
