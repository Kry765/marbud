import { useState } from "react";
import axios from "axios";
import contact from "./contact.module.scss";
import { TextField } from "@mui/material";
import ButtonAction from "../../ui/Button/ButtonAction";
import { contactData } from "../../data/contactData.json";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Kliknięto przycisk 'Wyślij'");
    try {
      await axios.post("http://localhost:1337/api/contact/send", formData);
      alert("Wiadomość wysłana!");
    } catch (error) {
      console.error("Błąd:", error);
      alert("Nie udało się wysłać wiadomości.");
    }
  };

  return (
    <div className={contact.contactWrapper}>
      <form className={contact.formBox} onSubmit={handleSubmit}>
        <h1 className={contact.titleForm}>
          Masz pytania?{" "}
          <span className={contact.titleColor}>Skontaktuj się z nami</span>
        </h1>
        <TextField
          id="name"
          label="Imię"
          variant="standard"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label="Telefon"
          variant="standard"
          value={formData.phone}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="email"
          label="E-Mail"
          variant="standard"
          value={formData.email}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="message"
          label="Wiadomość"
          variant="standard"
          value={formData.message}
          multiline
          minRows={3}
          fullWidth
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Wyślij
        </button>
      </form>
      <div className={contact.formInfo}>
        {contactData.map((data, index) => (
          <div className={contact.contactInfoBox} key={index}>
            <ion-icon
              name={data.icon}
              className={contact.contactIcon}
            ></ion-icon>
            <div className={contact.contactDescription}>
              <div className={contact.contactTitleBold}>{data.title}</div>
              <div>{data.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
