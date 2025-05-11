import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Subtitle from "../ui/Subtitle/Subtitile.jsx";
import OfffertsList from "../components/OffertsList/OffertsList.jsx";
import "../scss/main.scss";
import LoadingComponent from "../ui/LoadingComponent/LoadingComponent.jsx";
import { Suspense } from "react";

export default function OffertsType() {
  const [domki, setDomki] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    fetch(`https://marbudapi.onrender.com/api/${type}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setDomki(data.data);
      })
      .catch((err) => console.error("Błąd podczas pobierania danych:", err));
  }, [type]);

  return (
    <>
      {" "}
      <Suspense fallback={<LoadingComponent />}>
        <nav>
          <Navbar />
        </nav>
        <header>
          <HomeSlider />
        </header>
        <main className="page-wrapper">
          <Subtitle className="title-margin">
            oferta -{" "}
            <span className="title-color">
              {type === "domki-letniskowes"
                ? "Domki Letniskowe"
                : "Domki Całoroczne"}
            </span>
          </Subtitle>
          <section>
            {domki.map((domek) => {
              const imageUrl =
                domek.image?.url ||
                (domek.image?.data?.attributes?.url
                  ? `https://res.cloudinary.com/dthrbelf6/image/upload/${domek.image.data.attributes.url}`
                  : null);
              return (
                <OfffertsList
                  key={domek.id}
                  domek={domek}
                  imageUrl={imageUrl}
                  type={type}
                  id={domek.id}
                />
              );
            })}
          </section>
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
