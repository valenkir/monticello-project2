$(() => {
  const collectionPhotosUrl =
    "https://api.unsplash.com/collections/pL94KieP6FA/photos?client_id=5QrQ-9vm-WlVZEoUtqCC31oRJOj1ZVrJq10KvSqq9Rw";
  const collectionUrl =
    "https://api.unsplash.com/collections/pL94KieP6FA?client_id=5QrQ-9vm-WlVZEoUtqCC31oRJOj1ZVrJq10KvSqq9Rw";

  let pageCounter = 2;

  const showPhotos = (photos) => {
    photos.forEach((photo) => {
      const imgContainer = $("<div></div>");
      imgContainer.addClass("gallery-item");
      const galleryImg = $(
        `<img src=${photo.urls.regular} alt=${photo.description} />`
      );
      galleryImg.addClass("gallery-item__img");
      imgContainer.append(galleryImg);
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
