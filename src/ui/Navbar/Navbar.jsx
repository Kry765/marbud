import Logo from "../Logo/Logo.jsx";
import SocialMediaIcon from "../SocialMediaIcon/SocialMediaIcon.jsx";
import { Link } from "react-router-dom";
// import MenuItems from "../MenuItems/MenuItems.jsx";
import BurgerIcon from "../BurgerIcon/BurgerIcon.jsx";
import { useState, useEffect } from "react";
import { menuData } from "../../data/menuData.json";
import CloseIcon from "../CloseIcon/CloseIcon.jsx";
import navbar from "./navbar.module.scss";

export default function Navbar() {
  const [mobileIcon, setMobileIcon] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolling, setScrolling] = useState(false);

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
      <Link to="/">
        {" "}
        <Logo />
      </Link>

      <div className={navbar.desktopMenuItems}>
        {menuData.map((data, index) => (
          <Link to={data.path} key={index} className={navbar.desktopMenuItem}>
            {data.title}
          </Link>
        ))}
      </div>
      <div onClick={handleClick}>
        {mobileIcon ? (
          <BurgerIcon className={navbar.burgerIcon} />
        ) : (
          <CloseIcon className={navbar.closeIcon} />
        )}
      </div>
      <div>
        {mobileMenu ? (
          <div className={navbar.mobileMenuItems}>
            <Logo className={navbar.mobileLogo} />
            <div>
              {menuData.map((data, index) => (
                <div className={navbar.mobileMenuItem}>
                  <Link to={data.path} key={index}>
                    {data.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : undefined}
      </div>
      <div className={navbar.socialPosition}>
        <SocialMediaIcon className={navbar.socialIcon} />
      </div>
    </div>
  );
}
