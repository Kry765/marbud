import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import how from "./how.module.scss";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";
import { useEffect, useState } from "react";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";

export default function HowToWork() {
  const [howDatas, setHowDatas] = useState({
    howdata: [],
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        const howdata = await getStrapiData({
          endpoint: "how-to-works",
          fetchData: (data) => {
            const sortedData = data
              .map((item) => ({
                icon: item.icon,
                description: item.description,
                position: item.position,
              }))
              .sort((a, b) => a.position - b.position);
            return sortedData;
          },
        });

        setHowDatas({
          howdata,
        });
      } catch (error) {
        console.error("Error loading how to work data:", error);
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
        <Subtitle className={how.title}>Jak działamy</Subtitle>
        <div className={how.container}>
          {howDatas.howdata.map((data, index) => (
            <div className={how.box} key={index}>
              <IconComponent
                name={data.icon}
                className={how.howToWorkIcon}
              ></IconComponent>
              <div className={how.howToWorkDescription}>{data.description}</div>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
