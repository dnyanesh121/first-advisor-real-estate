import Icon from "../../assets/icons/Icon";

export default function Pagination({ total, perPage, page, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <nav className="pager" aria-label="Pagination">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <Icon name="chevronL" style={{ width: 16, margin: "auto" }} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button type="button" key={n} aria-current={n === page ? "page" : undefined} onClick={() => onChange(n)}>{n}</button>
      ))}
      <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Next page">
        <Icon name="chevronR" style={{ width: 16, margin: "auto" }} />
      </button>
    </nav>
  );
}
