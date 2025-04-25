import Navbar from "../../ui/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import GalleryComponent from "../../components/GalleryComponent/GalleryComponent.jsx";
import { useState, useEffect } from "react";
import mainGallery from "./mainGallery.module.scss";

export default function Gallery() {
  const [galleryStyle] = useState({
    width: "100%",
  });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/galerias?populate=image")
      .then((res) => res.json())
      .then((data) => {
        const formattedPhotos = data.data.flatMap((item) => {
          return item.image.map((image) => {
            const imageUrl = image?.formats?.medium?.url;
            const altText = image?.alternativeText;
            return {
              image: imageUrl ? `http://localhost:1337${imageUrl}` : "",
              title: altText == null ? "Brak opisu" : `obrazek ${altText}`,
            };
          });
        });
        setPhotos(formattedPhotos);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main>
        <header>
          <Subtitle className={mainGallery.title}>Galeria</Subtitle>
        </header>
        <article>
          <p className={mainGallery.description}>
            Wybierz swój wymarzony dom spośród kilkunastu dostępnych projektów.
            Nasze propozycje są wynikiem wielu lat doświadczeń, zaangażowania i
            sprawdzonej technologii.
          </p>
        </article>
        <figure>
          <div>
            <GalleryComponent
              className={mainGallery.galleryView}
              galleryStyle={galleryStyle}
              photos={photos}
              cols={3}
            />
          </div>
        </figure>
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
