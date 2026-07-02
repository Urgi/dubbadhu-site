export default function SectionHeader({ label, title, lede, align = "left", id }) {
  return (
    <header className={`section-header section-header--${align}`}>
      {label ? <p className="section-label">{label}</p> : null}
      {title ? (
        <h2 id={id} className="section-title">
          {title}
        </h2>
      ) : null}
      {lede ? <p className="section-lede">{lede}</p> : null}
    </header>
  );
}
