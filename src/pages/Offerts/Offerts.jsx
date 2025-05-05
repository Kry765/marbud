import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import { Link } from "react-router-dom";
import { offertsData } from "../../data/offertsData.json";
import houseSummer from "../../assets/offertsPhoto/domek_sezonowy.jpg";
import houseYearRound from "../../assets/offertsPhoto/domek_caloroczny.jpg";
import offerts from "./offerts.module.scss";
import LoadingComponent from "../../ui/LoadingComponent/LoadingComponent.jsx";
import { Suspense } from "react";
const houseTypes = [
  {
    path: "/oferta/domki-letniskowes",
    image: houseSummer,
    alt: "domek letniskowy",
    description: "Domek letniskowy",
  },
  {
    path: "/oferta/domki-calorocznes",
    image: houseYearRound,
    alt: "domek całoroczny",
    description: "Domek całoroczny",
  },
];

export default function Offerts() {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <nav>
          <Navbar />
        </nav>
        <header>
          <HomeSlider />
        </header>
        <main data-aos="fade-right" data-aos-easing="ease-in-sine">
          <Subtitle className={offerts.title}>{offertsData[0].title}</Subtitle>
          <article>
            <p className={offerts.description}>{offertsData[0].description}</p>
          </article>
          <article>
            <p className={offerts.details}>{offertsData[0].details}</p>
          </article>
          <div className={offerts.photoOffertsBox}>
            {houseTypes.map((house, index) => (
              <Link key={index} to={house.path}>
                <div className={offerts.photoOffertWrapper}>
                  <img
                    className={offerts.photoOffertsButton}
                    src={house.image}
                    alt={house.alt}
                  />
                  <div className={offerts.photoOffertsOpacity}>
                    <p className={offerts.photoOffertsDescription}>
                      {house.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
