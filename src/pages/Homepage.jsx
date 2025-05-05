import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import "../scss/main.scss";
import WhyMarbudSection from "../components/WhyMarbudSection/WhyMarbudSection.jsx";
import GoogleMaps from "../components/GoogleMaps/GoogleMaps.jsx";
import AllRightReserved from "../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import { useEffect, useState } from "react";
import { getStrapiData } from "../hooks/getStrapiData.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Subtitle from "../ui/Subtitle/Subtitile.jsx";
import LoadingComponent from "../ui/LoadingComponent/LoadingComponent.jsx";
import { Suspense } from "react";

export default function Homepage() {
  const [homepageData, setHomepageData] = useState({
    homepage: [],
  });

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-sine",
      offset: 150,
      once: true,
    });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const homepage = await getStrapiData({
          endpoint: "strona-glownas?populate=*",
          fetchData: (data) => {
            const sortedData = data
              .map((item) => ({
                title: item.title,
                description: item.description,
                imageUrl: item.image?.url,
                imageUrlSmall: item.image?.formats?.small?.url,
                button: item.button,
                position: item.position,
                path: item.path,
              }))
              .sort((a, b) => a.position - b.position);

            return sortedData;
          },
        });

        setHomepageData({
          homepage,
        });
      } catch (error) {
        console.error("Error loading homepage data: ", error);
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
        <main>
          <WhyMarbudSection />
          {homepageData.homepage.map((data, index) => (
            <article key={index} className={index % 2 === 1 ? "reverse" : ""}>
              <HeroSection
                data={data}
                isReverse={index % 2 === 1}
                showButton={data.button}
              />
            </article>
          ))}
          <figure>
            <section className="page-wrapper">
              <ContactForm />
            </section>
            <section
              className="page-wrapper"
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
            >
              <Subtitle className="title-margin">
                Znajdziesz nas <span className="title-color">tutaj!</span>
              </Subtitle>
              <GoogleMaps />
            </section>
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
