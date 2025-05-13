import logo from "./logo.module.scss";

export default function Logo({ className }) {
  return (
    <span className={className}>
      MAR<span className={logo.colorMarbud}>BUD</span>
    </span>
  );
}
