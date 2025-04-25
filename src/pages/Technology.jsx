import Navbar from "../ui/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import HeroSecion from "../components/HeroSection/HeroSection.jsx";
import AllRightReserved from "../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
// import { technologydata } from "../data/technologyData.json";
import { useEffect, useState } from "react";

export default function Technology() {
  const [technologyData, setTechnologyData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/technologias?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const fetchData = data.data.map((item) => ({
          title: item.title,
          description: item.description,
          imageUrl: `http://localhost:1337${item.image?.url}`,
          button: item.button,
        }));
        setTechnologyData(fetchData);
      })
      .catch((err) => console.error(err));
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
        {technologyData.map((data, index) => (
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
    </>
  );
}
