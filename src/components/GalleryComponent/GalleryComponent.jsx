import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState } from "react";
import gallery from "./gallery.module.scss";

export default function GalleryComponent({ cols, photos, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);

  const slides = photos.map((item) => ({
    src: item.image,
    alt: item.title,
  }));

  return (
    <div className={gallery.galleryBox}>
      <ImageList
        className={className}
        sx={{
          height: "auto",
          overflow: "hidden",
          cursor: "pointer",
        }}
        cols={cols}
      >
        {photos.length > 0 ? (
          photos.map((item, index) => (
            <ImageListItem
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setOpenIndex(index)}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <ImageListItemBar
                title={item.title}
                className={`${gallery.hoverBar} ${
                  hoveredIndex === index ? gallery.active : ""
                }`}
              />
            </ImageListItem>
          ))
        ) : (
          <p>Brak obrazków</p>
        )}
      </ImageList>

      <Lightbox
        open={openIndex !== -1}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
