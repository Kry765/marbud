import React from "react";

interface FooterSectionProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const FooterSection = <T,>({
  title,
  items,
  renderItem,
}: FooterSectionProps<T>) => {
  return (
    <div className="py-8 md:w-1/4">
      <h2 className="uppercase text-xl">{title}</h2>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default FooterSection;
