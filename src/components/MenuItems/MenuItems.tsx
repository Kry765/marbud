import { Link } from "react-router-dom";

interface Props {
  className: string;
  menuData: MenuType[];
}

export default function MenuItems({ menuData, className }: Props) {
  return menuData.map((data, index) => (
    <Link to={data.path} key={index} className={className}>
      {data.label}
    </Link>
  ));
}
