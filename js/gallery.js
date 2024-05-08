$(() => {
  const collectionPhotosUrl =
    "https://api.unsplash.com/collections/pL94KieP6FA/photos?client_id=5QrQ-9vm-WlVZEoUtqCC31oRJOj1ZVrJq10KvSqq9Rw";
  const collectionUrl =
    "https://api.unsplash.com/collections/pL94KieP6FA?client_id=5QrQ-9vm-WlVZEoUtqCC31oRJOj1ZVrJq10KvSqq9Rw";
  const referal = "utm_source=monticello&utm_medium=referral";

  let pageCounter = 2;

  const cropText = (text) => {
    return text.length <= 14
      ? text
      : text.length > 14
      ? `${text.substring(0, 12)}...`
      : "anonymous author";
  };

  const showPhotos = (photos) => {
    photos.forEach((photo) => {
      //PHOTO
      const imgContainer = $("<div></div>");
      imgContainer.addClass("gallery-item d-flex flex-column");
      const galleryImg = $(
        `<img src=${photo.urls.regular} alt=${photo.alt_description} />`
      );
      galleryImg.addClass("gallery-item__img");
      imgContainer.append(galleryImg);

      //ATTRIBUTION
      const refContainer = $("<div class='gallery-item__ref'></div>");
      const authorParagraph = $(`<p class='secondary-txt-color'>Photo by </p>`);
      const authorLink = $(
        `<a class="secondary-txt-color fw-bold">${cropText(
          photo.user.name
        )}</a>`
      );
      authorLink.attr(
        "href",
        `https://unsplash.com/@${photo.user.username}?${referal}`
      );
      authorParagraph.append(authorLink);

      const unsplashLink = $(
        `<a class='secondary-txt-color d-block mt-6'>(Unsplash)</a>`
      );
      unsplashLink.attr("href", `https://unsplash.com/?${referal}`);
      refContainer.append(authorParagraph, unsplashLink);
      imgContainer.append(refContainer);
      $(".gallery-photos").append(imgContainer);
    });
  };

  $.ajax({
    method: "GET",
    url: collectionUrl,
  })
    .done((data) => {
      $.ajax({
        method: "GET",
        url: collectionPhotosUrl,
      }).done((photos) => {
        console.log(photos);
        showPhotos(photos);

        $(".gallery-item__img").on("click", (event) => {
          if ($(".gallery-main__modal").hasClass("d-none")) {
            const modalImgContainer = $("<div></div>");
            modalImgContainer.addClass("h-100");

            const imgSource = $(event.target).attr("src");
            const imgAlt = $(event.target).attr("alt");
            const img = $(
              `<img src=${imgSource} alt=${imgAlt} class="object-scale-down h-100 w-100" />`
            );
            modalImgContainer.append(img);
            $(".gallery-main__modal").append(modalImgContainer);
            $(".gallery-main__modal").removeClass("d-none");
          }
        });

        $(".gallery-main__modal-close-btn").on("click", () => {
          $(".gallery-main__modal").addClass("d-none");
          $(".gallery-main__modal").children().not("i").remove();
        });
        if (data.total_photos > 10) {
          const seeMoreBtn = $("<button type=button>See More</button>");
          seeMoreBtn.addClass("primary-btn text-uppercase see-more-btn");
          $("main").append(seeMoreBtn);

          $(".see-more-btn").on("click", () => {
            $.ajax({
              method: "GET",
              url: `${collectionPhotosUrl}&page=${pageCounter}`,
            })
              .done((data) => {
                if (data.length) {
                  showPhotos(data);
                  pageCounter++;
                } else {
                  $(".see-more-btn").remove();
                }
              })
              .fail((error) => {
                console.log(error);
              });
          });
        }
      });
    })
    .fail((error) => {
      console.log(error);
    });
});
