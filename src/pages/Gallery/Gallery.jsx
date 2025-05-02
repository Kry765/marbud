import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import GalleryComponent from "../../components/GalleryComponent/GalleryComponent.jsx";
import { useState, useEffect } from "react";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";
import mainGallery from "./mainGallery.module.scss";

export default function Gallery() {
  const [galleryStyle] = useState({
    width: "100%",
  });
  const [galleryData, setGalleryData] = useState({
    photos: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const photos = await getStrapiData({
          endpoint: "galerias?populate=image",
          fetchData: (data) =>
            data
              .map((item) => ({
                imageUrl: `http://localhost:1337${item.image?.url}`,
                position: item.position,
              }))
              .sort((a, b) => a.position - b.position),
        });

        setGalleryData({
          photos,
        });
      } catch (error) {
        console.error("Error loading gallery data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main data-aos="fade-right" data-aos-easing="ease-in-sine">
        <article className={mainGallery.main}>
          <header>
            <Subtitle className={mainGallery.title}>Galeria</Subtitle>
          </header>
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
              photos={galleryData.photos}
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
