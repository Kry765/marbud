import Navbar from "../ui/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import WhyMarbudSection from "../components/WhyMarbudSection/WhyMarbudSection.jsx";
import GoogleMaps from "../ui/GoogleMaps/GoogleMaps.jsx";
import AllRightReserved from "../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import HeroSecion from "../components/HeroSection/HeroSection.jsx";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [homepageData, setHomepageData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/strona-glownas?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const fetchData = data.data.map((item) => ({
          title: item.title,
          description: item.description,
          imageUrl: `http://localhost:1337${item.image?.url}`,
          button: item.button,
        }));
        setHomepageData(fetchData);
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
      <article>
        <WhyMarbudSection />
      </article>
      <main>
        {homepageData.map((data, index) => (
          <article key={index} className={index % 2 === 1 ? "reverse" : ""}>
            <HeroSecion
              data={data}
              isReverse={index % 2 === 1}
              showButton={data.button}
            />
          </article>
        ))}
        <figure>
          <section>
            <ContactForm />
          </section>
          <GoogleMaps />
        </figure>
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
