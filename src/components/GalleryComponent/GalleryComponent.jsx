import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState } from "react";
import gallery from "./gallery.module.scss";

export default function GalleryComponent({
  cols,
  photos,
  className,
  mobileCols,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);

  const slides = photos.map((item) => ({
    src: item.imageUrl,
    alt: item.title || "Obrazek",
  }));

  return (
    <div className={gallery.galleryBox}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {photos.map((item, index) => (
          <div key={index} style={{ aspectRatio: "4/3" }}>
            <img
              src={item.imageUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
        {photos.length > 0 ? (
          photos.map((item, index) => (
            <ImageListItem
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setOpenIndex(index)}
              sx={{
                aspectRatio: "4/3", // Utrzymaj proporcje
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title || "Obrazek"}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <ImageListItemBar
                title={item.title || `Realizacja marbud`}
                className={`${gallery.hoverBar} ${
                  hoveredIndex === index ? gallery.active : ""
                }`}
              />
            </ImageListItem>
          ))
        ) : (
          <p>Brak obrazków</p>
        )}
      </div>

      <Lightbox
        open={openIndex !== -1}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
