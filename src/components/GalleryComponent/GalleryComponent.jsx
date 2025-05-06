import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import gallery from "./gallery.module.scss";

export default function GalleryComponent({ photos, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const location = useLocation();

  const slides = photos.map((item) => ({
    src: item.imageUrl,
    alt: item.alternativeText,
    title: item.title || "Realizacja marbud", // Dodajemy tytuł do slajdów
  }));

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
                alt={item.title || "Obrazek"}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <ImageListItemBar
                title={item.title || "Realizacja marbud"}
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
        render={{
          slide: ({ slide }) => (
            <div style={{ position: "relative", height: "100%" }}>
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              {slide.title && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "16px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {slide.title}
                </div>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
}
