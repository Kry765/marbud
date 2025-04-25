import logo from "./logo.module.scss";

export default function Logo({ className }) {
  return (
    <h1 className={className}>
      MAR<span className={logo.colorMarbud}>BUD</span>
    </h1>
  );
}
