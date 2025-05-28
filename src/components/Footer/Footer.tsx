import Logo from "../../ui/Logo/Logo";
import IconComponent from "../../ui/IconComponent/IconComponent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStrapiData } from "../../hooks/getStrapiData";
import FooterDescription from "./FooterDescription";

import footerDescriptionData from "../../data/footerDescriptionData.json";
import menuData from "../../data/menuData.json";

import type { FooterDescriptionType } from "../../types/FooterDescriptionType";
import type { MenuType } from "../../types/MenuType";
import MenuItems from "../MenuItems/MenuItems";

const typeData = footerDescriptionData as FooterDescriptionType;
const typeMenu = menuData as MenuType;

const description = typeData.footerDescription.description;

export default function Footer() {
  const [footerData, setFooterData] = useState({
    menu: [],
    social: [],
    description: "Brak opisu",
    contact: [],
    address: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const social = await getStrapiData({
          endpoint: "stopka-opis-socials",
          fetchData: (data) =>
            data.map((item) => ({
              socialIcon: item.socialIcon,
              path: item.path,
              position: item.position,
            })),
        });

        const descriptionData = await getStrapiData({
          endpoint: "stopka-opi",
        });

        const contact = await getStrapiData({
          endpoint: "stopka-danes",
          fetchData: (data) =>
            data
              .map((item) => ({
                nameSurname: item.nameSurname,
                phone: item.phone,
                email: item.email,
                position: item.position,
              }))
              .sort((a, b) => a.position - b.position),
        });

        const address = await getStrapiData({
          endpoint: "stopka-adress",
          fetchData: (data) =>
            data
              .map((item) => ({
                street: item.street,
                city: item.city,
                position: item.position,
              }))
              .sort((a, b) => a.position - b.position),
        });

        setFooterData({
          social,
          description: descriptionData.description || "Brak opisu",
          contact,
          address,
        });
      } catch (error) {
        console.error("Error loading footer data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-center md:justify-start md:text-left sm:text-center items-center md:items-start bg-black text-white leading-8 p-6">
      <div className="md:w-1/4 flex flex-col py-8">
        <Logo />
        <FooterDescription description={description} />
        <div className="flex justify-center md:justify-start gap-2">
          {footerData.social.map((data, index) => (
            <Link
              to={data.path}
              key={index}
              className="hover:text-green-600 transition-colors duration-250 p-2 text-2xl"
              aria-label={data.name || `Link do ${data.path}`}
            >
              <IconComponent name={data.socialIcon}></IconComponent>
            </Link>
          ))}
        </div>
      </div>

      <div className="py-8 md:w-1/4 uppercase">
        <h2 className="uppercase text-xl">Menu</h2>
        <MenuItems
          menuData={typeMenu.menuData}
          className="flex justify-center md:justify-start hover:text-green-600 transition-colors duration-250"
        />
      </div>

      <div className="py-8 md:w-1/4">
        <h2 className="uppercase text-xl">kontakt</h2>
        {footerData.contact.map((data, index) => (
          <div key={index}>
            <p>{data.nameSurname}</p>
            <p>{data.phone}</p>
            <p>{data.email}</p>
          </div>
        ))}
      </div>

      <div className="py-8 md:w-1/4">
        <h3 className="uppercase text-xl">Adres</h3>
        {footerData.address.map((data, index) => (
          <div key={index}>
            <p>{data.street}</p>
            <p>{data.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
