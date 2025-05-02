import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ButtonAction({
  children,
  className = "",
  to = "",
  tabIndex,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
}) {
  return (
    <Button
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      className={className}
      variant="contained"
      component={RouterLink}
      to={to}
      sx={{
        textTransform: "uppercase",
        backgroundColor: "#2E7D32",
        color: "#fff",
        fontWeight: "bold",
        margin: "1em 0",
        textDecoration: "none",
        height: "48px",
        minWidth: "200px",
        "&:hover": {
          backgroundColor: "#F57C00",
        },
      }}
    >
      {children}
    </Button>
  );
}
