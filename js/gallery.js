$(() => {
  const collectionUrl =
    "https://api.unsplash.com/collections/pL94KieP6FA/photos?client_id=5QrQ-9vm-WlVZEoUtqCC31oRJOj1ZVrJq10KvSqq9Rw";
  const url =
    "https://api.unsplash.com/collections/pL94KieP6FA?client_id=5QrQ-9vm-WlVZEoUtqCC31oRJOj1ZVrJq10KvSqq9Rw";

  let pageCounter = 2;

  const showPhotos = (photos) => {
    photos.forEach((photo) => {
      const imgContainer = $("<div></div>");
      imgContainer.addClass("gallery-item");
      const img = $(
        `<img src=${photo.urls.regular} alt=${photo.description} />`
      );
      imgContainer.append(img);
      $(".gallery-photos").append(imgContainer);
    });
  };

  $.ajax({
    method: "GET",
    url: url,
  })
    .done((data) => {
      $.ajax({
        method: "GET",
        url: collectionUrl,
      }).done((photos) => {
        showPhotos(photos);
        if (data.total_photos > 10) {
          const seeMoreBtn = $("<button type=button>See More</button>");
          seeMoreBtn.addClass("primary-btn text-uppercase see-more-btn");
          $("main").append(seeMoreBtn);

          $(".see-more-btn").on("click", () => {
            $.ajax({
              method: "GET",
              url: `${collectionUrl}&page=${pageCounter}`,
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
