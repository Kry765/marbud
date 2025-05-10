import { CircularProgress } from "@mui/material";

export default function LoadingComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#2E7D32",
      }}
    >
      <CircularProgress />
    </div>
  );
}
