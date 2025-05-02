import subtitle from "./subtitle.module.scss";

export default function Subtitle({ children, className }) {
  return (
    <div className={className}>
      <h2 className={subtitle.headerTitle}>{children}</h2>
    </div>
  );
}
