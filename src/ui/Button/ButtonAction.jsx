import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ButtonAction({ children, className = "", to = "#" }) {
  return (
    <Button
      className={className}
      variant="contained"
      component={RouterLink}
      to={to}
      sx={{
        backgroundColor: "#59956C",
        color: "#fff",
        fontWeight: "bold",
        margin: "1em 0",
        textDecoration: "none",
        "&:hover": {
          backgroundColor: "#457a54",
        },
      }}
    >
      {children}
    </Button>
  );
}
