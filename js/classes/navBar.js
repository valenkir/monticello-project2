export class NavBar {
  constructor(webContainer, mobileNavBtn, closeBtn) {
    this.webContainer = webContainer;
    this.mobileNavBtn = mobileNavBtn;
    this.closeBtn = closeBtn;
  }

  #hideMobileMenu() {
    $(this.mobileNavBtn).children().css("fill", "none");
    $(this.webContainer).removeClass("navbar-list__links--mobile-menu");
    $(this.closeBtn).addClass("d-none");
  }

  toggleMobileNavbar() {
    $(this.mobileNavBtn).on("click", () => {
      $(this.webContainer).addClass("navbar-list__links--mobile-menu");
      $(this.mobileNavBtn).children().css("fill", "#ffff");
      $(this.closeBtn).removeClass("d-none");
    });

    $(this.webContainer).on("click", (event) => {
      if ($(event.target).is("a")) {
        this.#hideMobileMenu();
      }
    });

    $(this.closeBtn).on("click", () => this.#hideMobileMenu());
  }
}

export class NavLinks {
  constructor(links) {
    this.links = links;
  }

  #scrollToElement = (elem) => {
    $("body, html").animate(
      {
        scrollTop: elem.offset().top,
      },
      2000
    );
  };

  setNavigation() {
    this.links.forEach((link) => {
      $(link.linkElem).on("click", () => {
        this.#scrollToElement($(link.destination));
      });
    });
  }
}
