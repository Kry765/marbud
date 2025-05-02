import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./hooks/scrollToTop";

const Homepage = lazy(() => import("./pages/Homepage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Technology = lazy(() => import("./pages/Technology"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const HowToWork = lazy(() => import("./pages/HowToWork/HowToWork"));
const Offerts = lazy(() => import("./pages/Offerts/Offerts"));
const OffertsType = lazy(() => import("./pages/OffertsType/OffertsType"));
const DetailedOffertsPage = lazy(() =>
  import("./pages/DetailedOffertsPage/DetailedOffertsPage")
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/technologia" element={<Technology />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/jak-dzialamy" element={<HowToWork />} />
          <Route path="/oferta" element={<Offerts />} />
          <Route path="/oferta/:type" element={<OffertsType />} />
          <Route path="/oferta/:type/:id" element={<DetailedOffertsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
