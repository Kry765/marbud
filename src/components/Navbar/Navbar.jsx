import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../scss/main.scss";
import Logo from "../../ui/Logo/Logo.jsx";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";
import navbar from "./navbar.module.scss";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";

export default function Navbar() {
  const [navData, setNavData] = useState({
    menu: [],
    social: [],
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const menu = await getStrapiData({
          endpoint: "stopka-nawigacjas",
          fetchData: (data) =>
            data.map((item) => ({ name: item.name, path: item.path })),
        });

        const social = await getStrapiData({
          endpoint: "stopka-opis-socials",
          fetchData: (data) =>
            data.map((item) => ({
              socialIcon: item.socialIcon,
              path: item.path,
            })),
        });

        setNavData({
          menu,
          social,
        });
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    setScrolling(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${navbar.nav} ${scrolling ? navbar.scrolled : ""}`}>
      <Link to="/" aria-label="Strona główna">
        <Logo />
      </Link>

      <div className={navbar.desktopMenu}>
        {navData.menu.map((data, index) => (
          <Link
            to={data.path}
            aria-label={data.name}
            key={index}
            className={`text-uppercase ${navbar.menuItem}`}
          >
            {data.name}
          </Link>
        ))}
      </div>

      <button
        className={navbar.menuToggle}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
      >
        <IconComponent
          name={isMenuOpen ? "close-outline" : "menu-outline"}
          className={navbar.menuIcon}
        />
      </button>

      {isMenuOpen && (
        <div className={`flex-center ${navbar.mobileMenu}`}>
          <div className={navbar.mobileMenuContent}>
            {navData.menu.map((data, index) => (
              <Link
                to={data.path}
                key={index}
                className={`text-uppercase ${navbar.mobileMenuItem}`}
                onClick={() => setIsMenuOpen(false)}
                aria-label={data.name}
              >
                {data.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={navbar.socialLinks}>
        {navData.social.map((data, index) => (
          <Link
            to={data.path}
            key={index}
            aria-label={`Link do ${data.socialIcon}`}
          >
            <IconComponent
              className={navbar.socialIcon}
              name={data.socialIcon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
