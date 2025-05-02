import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../ui/Logo/Logo.jsx";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";
import navbar from "./navbar.module.scss";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";

export default function Navbar() {
  const [navData, setNavData] = useState({
    menu: [],
    social: [],
  });
  const [mobileIcon, setMobileIcon] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
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

  const handleMobileMenuIcon = () => {
    setMobileIcon((prev) => !prev);
  };

  const handleMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  const handleClick = () => {
    handleMobileMenuIcon();
    handleMenu();
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className={`${navbar.nav} ${scrolling ? navbar.navScrolls : ""}`}>
      <Link to="/" aria-label={`strona główna` || `Link do ${data.path}`}>
        <Logo />
      </Link>

      <div className={navbar.desktopMenuItems}>
        {navData.menu.map((data, index) => (
          <Link
            to={data.path}
            aria-label={data.name || `Link do ${data.path}`}
            key={index}
            className={navbar.desktopMenuItem}
          >
            {data.name}
          </Link>
        ))}
      </div>
      <div onClick={handleClick}>
        {mobileIcon ? (
          <IconComponent
            name="reorder-three-outline"
            className={navbar.burgerIcon}
          />
        ) : (
          <IconComponent name="close-outline" className={navbar.closeIcon} />
        )}
      </div>
      <div>
        {mobileMenu ? (
          <div className={navbar.mobileMenuItems}>
            <Logo className={navbar.mobileLogo} />
            <div>
              {navData.menu.map((data, index) => (
                <div className={navbar.mobileMenuItem}>
                  <Link
                    to={data.path}
                    key={index}
                    aria-label={data.name || `Link do ${data.path}`}
                  >
                    {data.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : undefined}
      </div>
      <div className={navbar.socialPosition}>
        {navData.social.map((data, index) => (
          <Link
            to={data.path}
            key={index}
            aria-label={data.name || `Link do ${data.path}`}
          >
            <IconComponent
              className={navbar.socialIcon}
              name={data.socialIcon}
            ></IconComponent>
          </Link>
        ))}
      </div>
    </div>
  );
}
