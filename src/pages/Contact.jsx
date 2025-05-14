import Navbar from "../components/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import GoogleMaps from "../components/GoogleMaps/GoogleMaps.jsx";
import { Suspense } from "react";
import Subtitle from "../ui/Subtitle/Subtitile.jsx";
import "../scss/main.scss";
import LoadingComponent from "../ui/LoadingComponent/LoadingComponent.jsx";

export default function Contact() {
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
          <section>
            <ContactForm />
          </section>
          <section>
            <div role="figure" aria-label="Lokalizacja MARBUD na mapie">
              <Subtitle id="map-heading" className="title-margin">
                Znajdziesz nas <span className="title-color">tutaj!</span>
              </Subtitle>
              <GoogleMaps />
            </div>
          </section>
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
