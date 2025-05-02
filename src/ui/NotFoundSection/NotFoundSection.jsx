import notFound from "./notFound.module.scss";

export default function NotFoundSection() {
  return (
    <div className={notFound.notFoundBox}>
      <p className={notFound.notFoundTitle}>Nie znaleziono strony</p>
      <p className={notFound.notFound404}>404</p>
    </div>
  );
}
