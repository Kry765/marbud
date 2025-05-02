import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import why from "./why.module.scss";
import ButtonAction from "../../ui/ButtonAction/ButtonAction.jsx";
import { useState, useEffect } from "react";
import { getStrapiData } from "../../hooks/getStrapiData.jsx";
import IconComponent from "../../ui/IconComponent/IconComponent.jsx";

export default function WhyMarbudSection() {
  const [whyMarbud, setWhyMarbud] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getStrapiData({
          endpoint: "dlaczego-marbuds",
          fetchData: (items) =>
            items
              .map((item) => ({
                description: item.description,
                icon: item.icon,
                position: item.position,
              }))
              .sort((a, b) => a.position - b.position),
        });
        setWhyMarbud(data);
      } catch (error) {
        console.error("Błąd ładowania danych:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <article
      className={why.whyMarbudMain}
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
    >
      <div className={why.whyMarbudBox}>
        <Subtitle className={why.whyMarbudTitle}>
          dlaczego warto wybrać domki drewniane mar
          <span style={{ color: "#2E7D32" }}>bud</span>
        </Subtitle>

        <div className={why.whyMarbudWrapper}>
          {[...Array(3)].map((_, index) => {
            const item = whyMarbud[index];
            return (
              <div key={`marbud-${index}`} className={why.whyMarbudItem}>
                {isLoading || !item ? (
                  <>
                    <div className={why.skeletonIcon} />
                    <div className={why.skeletonText} />
                  </>
                ) : (
                  <>
                    <IconComponent
                      name={item.icon}
                      className={why.marbudIcon}
                    />
                    <p>{item.description}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={why.whyMarbudBtn}>
        <ButtonAction to={"../oferta"} variant="contained">
          oferta
        </ButtonAction>
      </div>
    </article>
  );
}
