import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { BUDGETS, CITIES, MODE_TYPES, TYPES } from "../../data/site";

/** Pill search bar: Location · Budget · Property Type · Search. */
export default function SearchBar({ mode = "buy", className = "" }) {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [lastMode, setLastMode] = useState(mode);
  if (lastMode !== mode) { setLastMode(mode); setBudget(""); setType(""); }

  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams({ mode });
    if (city) q.set("city", city);
    if (budget) q.set("budget", budget);
    if (type) q.set("type", type);
    navigate(`/properties?${q}`);
  };

  return (
    <form className={`searchbar ${className}`} role="search" aria-label="Property search" onSubmit={submit}>
      <div className="pill">
        <div className="sb-field">
          <Icon name="pin" className="lead-ico" />
          <label className="sr-only" htmlFor="hsCity">Location</label>
          <select id="hsCity" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Location</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="sb-field">
          <Icon name="wallet" className="lead-ico" />
          <label className="sr-only" htmlFor="hsBudget">Budget</label>
          <select id="hsBudget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            {BUDGETS[mode].map(([v, l]) => <option key={v || "any"} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="sb-field">
          <Icon name="building" className="lead-ico" />
          <label className="sr-only" htmlFor="hsType">Property Type</label>
          <select id="hsType" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Property Type</option>
            {MODE_TYPES[mode].map((t) => <option key={t} value={t}>{TYPES[t]}</option>)}
          </select>
        </div>
      </div>
      <button className="btn btn--grad go" type="submit"><Icon name="search" strokeWidth={2.2} /> Search</button>
    </form>
  );
}
