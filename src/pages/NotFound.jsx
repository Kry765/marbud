import Navbar from "../ui/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import NotFoundSection from "../ui/NotFoundSection/NotFoundSection.jsx";

export default function NotFound() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main>
        <NotFoundSection />
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
