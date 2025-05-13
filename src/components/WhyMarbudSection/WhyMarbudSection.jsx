import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import why from "./why.module.scss";
import ButtonAction from "../../ui/ButtonAction/ButtonAction.jsx";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";

export default function WhyMarbudSection() {
  const whyMarbud = [
    {
      icon: "construct-outline",
      title: "Najwyższa jakość wykonania",
      description:
        "Gwarantujemy <strong>wytrzymałe konstrukcje</strong> i <strong>staranne wykończenie</strong>, które podkreślają naturalne piękno drewna. Każdy detal jest precyzyjnie dopracowany.",
    },
    {
      icon: "home-outline",
      title: "Kompleksowa usługa",
      description:
        "Oferujemy <strong>całościowe rozwiązanie</strong>: od projektu, przez produkcję, dostawę, aż po montaż domków drewnianych w <strong>dogodnym dla Ciebie terminie</strong>.",
    },
    {
      icon: "settings-outline",
      title: "Pełna personalizacja",
      description:
        "Tworzymy domki drewniane <strong>w 100% dostosowane</strong> do Twoich potrzeb - zarówno pod względem <strong>rozmiaru, stylu</strong>, jak i <strong>funkcjonalności</strong>.",
    },
  ];

  return (
    <section
      className={why.whyMarbudMain}
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
      aria-labelledby="why-marbud-heading"
    >
      <Subtitle id="why-marbud-heading" className={why.whyMarbudTitle}>
        dlaczego warto wybrać domki drewniane firmy mar
        <span className="title-color">bud</span>
      </Subtitle>

      <div className={why.whyMarbudWrapper} role="list">
        {whyMarbud.map((data, index) => (
          <article key={index} className={why.whyMarbudItem} role="listitem">
            <IconComponent
              className={why.marbudIcon}
              name={data.icon}
              aria-hidden="true"
            />
            <h3 className={`text-uppercase ${why.benefitTitle}`}>
              {data.title}
            </h3>
            <div
              className={why.benefitText}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </article>
        ))}
      </div>

      <div className={why.whyMarbudBtn}>
        <ButtonAction to={"../oferta"} variant="contained">
          przejdź do oferty
        </ButtonAction>
      </div>
    </section>
  );
}
