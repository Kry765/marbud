import footer from "./footer.module.scss";
import Logo from "../../ui/Logo/Logo";
import { menuData } from "../../data/menuData.json";
import { footerData } from "../../data/footerData.json";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={footer.footerWrapper}>
      <div className={footer.footerBox}>
        <Logo />
        <p>{footerData[0].footerDescription}</p>
        <div className={footer.socialMediaPosition}>
          <div>
            <ion-icon
              name="logo-facebook"
              className={footer.footerMenu}
            ></ion-icon>
          </div>
          <div>
            <ion-icon
              name="logo-instagram"
              className={footer.footerMenu}
            ></ion-icon>
          </div>
        </div>
      </div>
      <div className={`${footer.footerBox} ${footer.footerUppercase}`}>
        <h3>Menu</h3>
        {menuData.map((data, index) => (
          <Link to={data.path} key={index} className={footer.footerMenu}>
            {data.title}
          </Link>
        ))}
      </div>
      <div className={footer.footerBox}>
        <h3>{footerData[0].footerContact.title}</h3>
        <p>{footerData[0].footerContact.name}</p>
        <p>{footerData[0].footerContact.phone}</p>
        <p>{footerData[0].footerContact.email}</p>
      </div>
      <div className={footer.footerBox}>
        <h3>{footerData[0].footerAdress.title}</h3>
        <p>{footerData[0].footerAdress.street}</p>
        <p>{footerData[0].footerAdress.city}</p>
      </div>
    </div>
  );
}
