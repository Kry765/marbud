import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import OfffertsList from "../../components/OffertsList/OffertsList.jsx";
import offertsType from "./offertsType.module.scss";
import "../../scss/main.scss";

export default function OffertsType() {
  const [domki, setDomki] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1337/api/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setDomki(data.data);
      })
      .catch((err) => console.error("Błąd podczas pobierania danych:", err));
  }, [type]);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main className="page-wrapper">
        <h2 className={offertsType.subtitle}>
          OFERTA -{" "}
          <span className={offertsType.title}>
            {type === "domki-letniskowes"
              ? "Domki Letniskowe"
              : "Domki Całoroczne"}
          </span>
        </h2>
        <section>
          {domki.map((domek) => {
            const imageUrl = domek.mainImage?.url;
            return (
              <OfffertsList
                key={domek.id}
                domek={domek}
                imageUrl={imageUrl}
                type={type}
              />
            );
          })}
        </section>
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
