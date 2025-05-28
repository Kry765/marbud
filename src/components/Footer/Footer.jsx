import Logo from "../../ui/Logo/Logo";
import IconComponent from "../../ui/IconComponent/IconComponent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStrapiData } from "../../hooks/getStrapiData";

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
        const menu = await getStrapiData({
          endpoint: "stopka-nawigacjas",
          fetchData: (data) =>
            data.map((item) => ({
              name: item.name,
              path: item.path,
              position: item.position,
            })),
        });

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
          menu,
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
    <div className="bg-black text-white text-center justify-center items-center md:flex flex-row justify-center leading-8 flex-wrap text-[1rem]">
      <div className="w-1/4 p-4 mt-1">
        <Logo />
        <p>{footerData.description}</p>
        <div className="flex gap-2">
          {footerData.social.map((data, index) => (
            <Link
              to={data.path}
              key={index}
              className="hover:cursor-pointer hover:text-[#59956C]"
              aria-label={data.name || `Link do ${data.path}`}
            >
              <IconComponent name={data.socialIcon}></IconComponent>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 w-1/4 m-1 uppercase">
        <h2>Menu</h2>
        {footerData.menu.map((data, index) => (
          <Link
            to={data.path}
            key={index}
            className="flex hover:cursor-pointer hover:color-[#59956C]"
            title={data.name}
          >
            {data.name}
          </Link>
        ))}
      </div>

      <div className="p-4 w-1/4 m-1">
        <h2 className="uppercase">kontakt</h2>
        {footerData.contact.map((data, index) => (
          <div key={index}>
            <p>{data.nameSurname}</p>
            <p>{data.phone}</p>
            <p>{data.email}</p>
          </div>
        ))}
      </div>

      <div className="p-4 w-1/4 m-1">
        <h3 className="uppercase">Adres</h3>
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
