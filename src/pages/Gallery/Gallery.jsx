import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import GalleryComponent from "../../components/GalleryComponent/GalleryComponent.jsx";
import { useState, useEffect } from "react";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";
import mainGallery from "./mainGallery.module.scss";
import LoadingComponent from "../../ui/LoadingComponent/LoadingComponent.jsx";
import { Suspense } from "react";

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
                imageUrl: item.image?.url,
                imageUrlSmall: item.image?.formats?.small?.url,
                position: item.position,
                title: item.title,
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
      <Suspense fallback={<LoadingComponent />}>
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
              Wybierz swój wymarzony dom spośród kilkunastu dostępnych
              projektów. Nasze propozycje są wynikiem wielu lat doświadczeń,
              zaangażowania i sprawdzonej technologii.
            </p>
          </article>
          <figure>
            <div>
              <GalleryComponent
                className={mainGallery.galleryView}
                photos={galleryData.photos}
                cols={3}
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              />
            </div>
          </figure>
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
