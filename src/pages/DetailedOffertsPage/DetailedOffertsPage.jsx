import Navbar from "../../components/Navbar/Navbar.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import DetailedOffertsComponent from "../../components/DetailedOffertsComponent/DetailedOffertsComponent.jsx";
import LoadingComponent from "../../ui/LoadingComponent/LoadingComponent.jsx";
import { Suspense } from "react";

export default function DetailedOffertsPage() {
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
          <DetailedOffertsComponent />
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
