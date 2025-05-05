import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Dodane
import gallery from "./gallery.module.scss";

export default function GalleryComponent({ photos, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const location = useLocation(); // Hook do wykrywania ścieżki URL

  const slides = photos.map((item) => ({
    src: item.imageUrl,
    alt: item.alternativeText || "Obrazek", // Alt z alternativeText
  }));

  // Załóżmy, że chcesz pokazywać pasek TYLKO na stronie "/galeria"
  const showTitleBar = location.pathname === "/galeria";

  return (
    <div className={`${gallery.galleryBox} ${className || ""}`}>
      <ImageList cols={3} gap={16}>
        {photos.length > 0 ? (
          photos.map((item, index) => (
            <ImageListItem
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setOpenIndex(index)}
              sx={{
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.alternativeText || "Obrazek"} // Tutaj też z alternativeText
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {showTitleBar && (
                <ImageListItemBar
                  title={item.alternativeText || "Realizacja marbud"} // Zawsze z alternativeText
                  className={`${gallery.hoverBar} ${
                    hoveredIndex === index ? gallery.active : ""
                  }`}
                />
              )}
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
