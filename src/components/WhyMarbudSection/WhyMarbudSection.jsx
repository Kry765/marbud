import Subtitle from "../../ui/Subtitle/Subtitile.jsx";
import why from "./why.module.scss";
import ButtonAction from "../../ui/Button/ButtonAction.jsx";
import { menuData } from "../../data/menuData.json";
import { whymarbudData } from "../../data/whymarbudData.json";

export default function WhyMarbudSection() {
  return (
    <>
      <div className={why.whyMarbudBox}>
        <Subtitle className={why.whyMarbudTitle}>
          dlaczego warto wybrać firmę marbud
        </Subtitle>
        <div className={why.whyMarbudWrapper}>
          {whymarbudData.map((data, index) => (
            <div key={index} className={why.whyMarbudBox}>
              <img
                src={data.icon}
                alt="icon why marbud"
                className={why.marbudIcon}
              />
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={why.whyMarbudBtn}>
        <ButtonAction
          className={why.whyMarbudBtn}
          to={menuData[0].path}
          variant="contained"
        >
          {menuData[0].title}
        </ButtonAction>
      </div>
    </>
  );
}
