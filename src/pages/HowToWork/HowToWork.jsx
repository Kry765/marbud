import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import "../../scss/main.scss";
import how from "./how.module.scss";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";
import { useEffect, useState } from "react";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";
import ReactMarkdown from "react-markdown";
import ButtonAction from "../../ui/ButtonAction/ButtonAction.jsx";
import LoadingComponent from "../../ui/LoadingComponent/LoadingComponent.jsx";
import { Suspense } from "react";

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
                title: item.title,
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
      <Suspense fallback={<LoadingComponent />}>
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
                <>
                  <div className={how.howToWorkDescription}>
                    <h2 className={how.howToWorkTitle}>{data.title}</h2>
                    <ReactMarkdown>{data.description}</ReactMarkdown>
                  </div>
                </>
              </div>
            ))}
          </div>
        </main>
        <div className="title-margin">
          <ButtonAction to="../kontakt">Skontaktuj się z nami!</ButtonAction>
        </div>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
