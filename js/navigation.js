$(() => {
  const hideMobileMenu = () => {
    $(".navbar-list__mobile-links").children().css("fill", "none");
    $(".navbar-list__links").removeClass("navbar-list__links--mobile-menu");
    $(".navbar-list__links-icon--mobile").addClass("d-none");
  };

  /*MOBILE NAVIGATION*/
  $(".navbar-list__mobile-links").on("click", () => {
    $(".navbar-list__links").addClass("navbar-list__links--mobile-menu");
    $(".navbar-list__mobile-links").children().css("fill", "#ffff");
    $(".navbar-list__links-icon--mobile").removeClass("d-none");
  });

  $(".navbar-list__links-icon--mobile").on("click", () => hideMobileMenu());

  $(".navbar-list__links").on("click", (event) => {
    if ($(event.target).is("a")) {
      hideMobileMenu();
    }
  });
});
