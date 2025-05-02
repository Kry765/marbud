import { useEffect, useState } from "react";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import InputField from "../../ui/InputField/InputField.jsx";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";
import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";
import contact from "./contact.module.scss";
import emailjs from "@emailjs/browser";
import * as yup from "yup";

export default function ContactForm() {
  const [contactData, setContactData] = useState({ contact: [] });
  const [isSubmit, setIsSubmit] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Imię musi mieć co najmniej 2 znaki")
      .required("Imię jest wymagane"),
    email: yup
      .string()
      .email("Nieprawidłowy format e-mail")
      .required("E-mail jest wymagany"),
    phone: yup
      .string()
      .matches(
        /^(\+?\d{2,3}[-\s]?)?\d{3}[-\s]?\d{3}[-\s]?\d{3}$/,
        "Nieprawidłowy numer telefonu (np. 123456789 lub 123-456-789)"
      )
      .required("Telefon jest wymagany"),
    message: yup
      .string()
      .min(10, "Wiadomość musi mieć co najmniej 10 znaków")
      .required("Wiadomość jest wymagana"),
  });

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = async (field) => {
    try {
      await yup.reach(schema, field).validate(formData[field]);
      setErrors({ ...errors, [field]: "" });
    } catch (error) {
      setErrors({ ...errors, [field]: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      validateField(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit("sending");
    setSubmitError("");

    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    try {
      await schema.validate(formData, { abortEarly: false });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmit("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        setSubmitError("Proszę poprawić zaznaczone pola");
      } else {
        console.error("Error:", error);
        setSubmitError(
          "Wystąpił błąd podczas wysyłania. Spróbuj ponownie później."
        );
      }
      setIsSubmit("error");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const contact = await getStrapiData({
          endpoint: "kontakt-infos",
          fetchData: (data) => {
            const sortedData = data
              .map((item) => ({
                title: item.title,
                description: item.description,
                icon: item.icon,
              }))
              .sort((a, b) => a.position - b.position);

            return sortedData;
          },
        });

        setContactData({ contact });
      } catch (error) {
        console.error("Error loading contact data: ", error);
      }
    };
    loadData();
  }, []);

  return (
    <div
      className={contact.contactWrapper}
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
    >
      <form className={contact.formBox} onSubmit={handleSubmit} noValidate>
        <Subtitle className={contact.titleForm}>
          Masz pytanie?
          <span className={contact.titleColor}> Napisz do nas!</span>
        </Subtitle>

        <InputField
          name="name"
          label="Imię"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          error={touched.name && errors.name}
          className={touched.name && errors.name ? contact.inputError : ""}
        />

        <InputField
          name="email"
          label="E-Mail"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          error={touched.email && errors.email}
          className={touched.email && errors.email ? contact.inputError : ""}
        />

        <InputField
          name="phone"
          label="Telefon"
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          error={touched.phone && errors.phone}
          className={touched.phone && errors.phone ? contact.inputError : ""}
        />

        <InputField
          name="message"
          label="Wiadomość"
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur("message")}
          error={touched.message && errors.message}
          className={
            touched.message && errors.message ? contact.inputError : ""
          }
          multiline
        />

        <button
          type="submit"
          className={contact.submitButton}
          disabled={isSubmit === "sending"}
        >
          {isSubmit === "sending" ? "Wysyłanie..." : "Wyślij"}
        </button>

        {isSubmit === "success" && (
          <div className={contact.successMessage}>
            Wiadomość wysłana pomyślnie!
          </div>
        )}

        {isSubmit === "error" && (
          <div className={contact.errorMessage}>
            {submitError}
            {Object.keys(errors).map(
              (key) =>
                errors[key] && (
                  <div key={key} className={contact.fieldError}>
                    {errors[key]}
                  </div>
                )
            )}
          </div>
        )}
      </form>

      <div className={contact.formInfo}>
        {contactData.contact.map((data, index) => (
          <div className={contact.contactInfoBox} key={index}>
            <IconComponent
              name={data.icon}
              className={contact.contactIcon}
            ></IconComponent>
            <div>
              <p className={contact.contactTitleBold}>{data.title}</p>
              <p>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
