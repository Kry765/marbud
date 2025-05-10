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
import "../../scss/main.scss";

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
        <main
          className="page-wrapper"
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
        >
          <Subtitle className="title-margin">{offertsData[0].title}</Subtitle>
          <div className="text-center">
            <p>{offertsData[0].description}</p>
            <p className="text-bold">{offertsData[0].details}</p>
          </div>
          <div className={`flex-center ${offerts.photoOffertsBox}`}>
            {houseTypes.map((house, index) => (
              <Link key={index} to={house.path}>
                <div className={offerts.photoOffertWrapper}>
                  <img
                    className={offerts.photoOffertsButton}
                    src={house.image}
                    alt={house.alt}
                  />
                  <div className={`flex-center ${offerts.photoOffertsOpacity}`}>
                    <p className="text-uppercase">{house.description}</p>
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
