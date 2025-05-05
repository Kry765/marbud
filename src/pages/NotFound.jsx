import Navbar from "../components/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../components/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import NotFoundSection from "../ui/NotFoundSection/NotFoundSection.jsx";
import { Suspense } from "react";
import LoadingComponent from "../ui/LoadingComponent/LoadingComponent.jsx";

export default function NotFound() {
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
          <NotFoundSection />
        </main>
        <footer>
          <Footer />
          <AllRightReserved />
        </footer>
      </Suspense>
    </>
  );
}
