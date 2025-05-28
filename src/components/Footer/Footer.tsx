import Logo from "../../ui/Logo/Logo";
import IconComponent from "../../ui/IconComponent/IconComponent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStrapiData } from "../../hooks/getStrapiData";
import FooterDescription from "./FooterDescription";
import MenuItems from "../MenuItems/MenuItems";
import FooterContactData from "./FooterContactData";
import footerDescriptionData from "../../data/footerDescriptionData.json";
import menuData from "../../data/menuData.json";

import type { FooterDescriptionType } from "../../types/FooterDescriptionType";
import type { MenuType } from "../../types/MenuType";
import type { ContactData, AddressData } from "../../types/OwnerData";

const typeData = footerDescriptionData as FooterDescriptionType;
const typeMenu = menuData as MenuType;

const description = typeData.footerDescription.description;

export default function Footer() {
  const [footerData, setFooterData] = useState<{
    social: any[];
    contact: ContactData[];
    address: AddressData[];
  }>({
    social: [],
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
      <FooterContactData<ContactData>
        title="Kontakt"
        items={footerData.contact}
        renderItem={(data) => (
          <>
            <p>{data.nameSurname}</p>
            <p>{data.phone}</p>
            <p>{data.email}</p>
          </>
        )}
      />
      <FooterContactData<AddressData>
        title="Adres"
        items={footerData.address}
        renderItem={(data) => (
          <>
            <p>{data.street}</p>
            <p>{data.city}</p>
          </>
        )}
      />
    </div>
  );
}
