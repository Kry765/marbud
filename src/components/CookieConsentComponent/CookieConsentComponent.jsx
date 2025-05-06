import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { useEffect } from "react";

export default function CookieConsentComponent() {
  useEffect(() => {
    const consent = getCookieConsentValue();
    if (consent === "true") {
      loadGoogleAnalytics();
    }
  }, []);

  function loadGoogleAnalytics() {
    if (window.gtag) return;

    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-2LKJQ7DRD6";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-2LKJQ7DRD6");
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Akceptuję"
      declineButtonText="Odrzucam"
      enableDeclineButton
      cookieName="myAwesomeCookieName2"
      style={{ background: "#000" }}
      buttonStyle={{
        backgroundColor: "#2E7D32",
        color: "#fff",
        fontSize: "12px",
        borderRadius: "6px",
      }}
      declineButtonStyle={{
        backgroundColor: "#B71C1C",
        color: "#fff",
        fontSize: "12px",
        borderRadius: "6px",
        marginLeft: "10px",
      }}
      expires={150}
      onAccept={() => loadGoogleAnalytics()}
      onDecline={() => {
        console.log("Cookies zostały odrzucone");
      }}
    >
      <span style={{ fontSize: "12px" }}>
        Ta strona używa plików cookies do analizowania ruchu (Google Analytics)
        oraz w celach funkcjonalnych. Możesz zaakceptować wszystkie pliki
        cookies lub odrzucić je. Twoja zgoda jest dobrowolna i możesz ją w
        każdej chwili wycofać.
      </span>
    </CookieConsent>
  );
}
