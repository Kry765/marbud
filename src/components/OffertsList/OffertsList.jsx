import list from "./list.module.scss";
import ButtonAction from "../../ui/ButtonAction/ButtonAction.jsx";
import { useParams } from "react-router-dom";

export default function OfffertsList({ domek, imageUrl }) {
  const { type } = useParams();

  return (
    <>
      <div
        key={domek.id}
        className={list.offertsSummerWrapper}
        data-aos="fade-right"
        data-aos-easing="ease-in-sine"
      >
        <div className={list.offertsSummerDescription}>
          <h3>{domek.title}</h3>
          <p>Ilość pomieszczeń: {domek.roomCount}</p>
          <p>Materiały: {domek.materials}</p>
          <p>Izolacja: {domek.isolation}</p>
          <p>Powierzchnia: {domek.area}</p>
          <p>Cena: {domek.price}</p>
          <div className={list.buttonOfferts}>
            <ButtonAction to={`/oferta/${type}/${domek.id}`}>
              Przejdź dalej
            </ButtonAction>
          </div>
        </div>
        <div className={list.offertsSummerImageBox}>
          {imageUrl ? (
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={domek.title}
              className={list.offertsSummerImage}
            />
          ) : (
            <p>Brak obrazka</p>
          )}
        </div>
      </div>
    </>
  );
}
