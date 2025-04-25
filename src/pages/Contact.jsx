import Navbar from "../ui/Navbar/Navbar.jsx";
import HomeSlider from "../components/HomeSlider/HomeSlider.jsx";
import AllRightReserved from "../ui/AllRightReserved/AllRightReserved.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ContactForm from "../components/ContactForm/ContactForm.jsx";

export default function Contact() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <HomeSlider />
      </header>
      <main>
        <ContactForm />
      </main>
      <footer>
        <Footer />
        <AllRightReserved />
      </footer>
    </>
  );
}
