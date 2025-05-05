import Navbar from "../components/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import HeroSecion from "../components/HeroSection/HeroSection.jsx";
import AllRightReserved from "../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import LoadingComponent from "../ui/LoadingComponent/LoadingComponent.jsx";
import { getStrapiData } from "../hooks/getStrapiData.jsx";
import { Suspense } from "react";

export default function Technology() {
  const [technologyData, setTechnologyData] = useState({
    technology: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const technology = await getStrapiData({
          endpoint: "technologias?populate=*",
          fetchData: (data) => {
            const sortedData = data
              .map((item) => ({
                title: item.title,
                description: item.description,
                imageUrl: item.image?.url,
                imageUrlSmall: item.image?.formats?.small?.url,
                button: item.button,
                path: item.path,
                position: item.position,
              }))
              .sort((a, b) => a.position - b.position);
            return sortedData;
          },
        });

        setTechnologyData({
          technology,
        });
      } catch (error) {
        console.error("Error loading footer data:", error);
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
          {technologyData.technology.map((data, index) => (
            <article key={index} className={index % 2 === 1 ? "reverse" : ""}>
              <HeroSecion
                data={data}
                isReverse={index % 2 === 1}
                showButton={data.button}
              />
            </article>
          ))}
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
