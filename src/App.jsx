import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery/Gallery";
import HowToWork from "./pages/HowToWork/HowToWork";
import Offerts from "./pages/Offerts/Offerts";
import OffertsType from "./pages/OffertsType/OffertsType";
import DetailedOffertsPage from "./pages/DetailedOffertsPage/DetailedOffertsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/technologia" element={<Technology />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/jak-dzialamy" element={<HowToWork />} />
          <Route path="/oferta" element={<Offerts />} />
          <Route path="/oferta/:type" element={<OffertsType />} />
          <Route path="/oferta/:type/:id" element={<DetailedOffertsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
