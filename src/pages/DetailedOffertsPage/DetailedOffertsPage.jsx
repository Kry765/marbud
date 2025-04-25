import Navbar from "../../ui/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import DetailedOffertsComponent from "../../components/DetailedOffertsComponent/DetailedOffertsComponent.jsx";
export default function DetailedOffertsPage() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main>
        <DetailedOffertsComponent />
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
