import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../ui/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import OfffertsList from "../../components/OffertsList/OffertsList.jsx";
import offertsType from "./offertsType.module.scss";

export default function OffertsType() {
  const [domki, setDomki] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1337/api/${type}?populate=mainImage`)
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
      <main>
        <Subtitle className={offertsType.subtitle}>
          oferta -{" "}
          <span className={offertsType.title}>
            {type === "domki-letniskowe"
              ? "domki-letniskowe"
              : "domki-całoroczne"}
          </span>
        </Subtitle>
        <section>
          {domki.map((domek) => {
            const imageUrl = domek.mainImage?.url;
            console.log("Image URL:", imageUrl);
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
