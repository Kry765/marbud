import Navbar from "../../ui/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx"
import { howtowork } from "../../data/howToWork.json";
import how from "./how.module.scss";

export default function HowToWork() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main>
        <Subtitle className={how.title}>Jak działamy</Subtitle>
        <div className={how.container}>
          {howtowork.map((data, index) => (
            <div className={how.box} key={index}>
              <ion-icon
                name={data.icon}
                className={how.howToWorkIcon}
              ></ion-icon>

              <div className={how.howToWorkDescription}>{data.description}</div>
            </div>
          ))}
          {/* <div className={how.verticalLine}></div> */}
        </div>
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
