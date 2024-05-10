import { NavBar, NavLinks } from "./classes/navBar.js";

$(() => {
  const navBar = new NavBar(
    ".navbar-list__links",
    ".navbar-list__mobile-links",
    ".navbar-list__links-icon--mobile"
  );

  navBar.toggleMobileNavbar();

  const links = [
    { linkElem: ".navbar-list__links-projects", destination: "#home-projects" },
    { linkElem: ".navbar-list__links-news", destination: "#news" },
    {
      linkElem: ".navbar-list__links-contacts",
      destination: "#map-and-contacts",
    },
    { linkElem: ".home-header__scroll-icon", destination: "#home-projects" },
  ];
  const navLinks = new NavLinks(links);
  navLinks.setNavigation();
});
