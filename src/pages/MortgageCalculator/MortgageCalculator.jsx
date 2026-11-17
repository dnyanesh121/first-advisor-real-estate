import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import CtaBand from "../../components/common/CtaBand";
import Tabs from "../../components/common/Tabs";
import SliderField, { SimpleSlider } from "./SliderField";
import AmortizationChart from "./AmortizationChart";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { emi, inr, shortInr } from "../../utils/format";

const BUDGET_STEPS = [5e6, 1e7, 2e7, 5e7, 1e8];
const stepFor = (v) => BUDGET_STEPS.find((s) => s >= v) || 1e8;

function amortize(loan, rate, years, monthly) {
  let bal = loan;
  const r = rate / 1200;
  return Array.from({ length: years }, (_, i) => {
    let principal = 0, interest = 0;
    for (let k = 0; k < 12; k++) { const iv = bal * r; interest += iv; principal += monthly - iv; bal -= monthly - iv; }
    return { year: i + 1, principal, interest, balance: Math.max(0, bal) };
  });
}

function EmiTab() {
  const { openModal } = useApp();
  const [params] = useSearchParams();
  const [price, setPrice] = useState(Math.min(1e8, Number(params.get("price")) || 12000000));
  const [dp, setDp] = useState(Number(params.get("dp")) || 20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const loan = price * (1 - dp / 100);
  const monthly = emi(loan, rate, years);
  const total = monthly * years * 12;
  const pct = (loan / total) * 100;
  const rows = useMemo(() => amortize(loan, rate, years, monthly), [loan, rate, years, monthly]);

  return (
    <>
      <div className="calc">
        <div className="panel">
          <SliderField id="price" label="Property price" min={1000000} max={100000000} step={100000} value={price} onChange={setPrice} prefix="₹" format={(v) => Number(v).toLocaleString("en-IN")} minLabel="₹10 L" maxLabel="₹10 Cr" />
          <SliderField id="dp" label="Down payment" min={10} max={90} step={1} value={dp} onChange={setDp} suffix="%" inputWidth={70} minLabel="10%" maxLabel="90%" />
          <SliderField id="rate" label="Interest rate (p.a.)" min={6} max={14} step={0.05} value={rate} onChange={setRate} suffix="%" inputWidth={70} format={(v) => Number(v).toFixed(2)} minLabel="6%" maxLabel="14%" />
          <SliderField id="yrs" label="Loan tenure" min={5} max={30} step={1} value={years} onChange={setYears} suffix="yrs" inputWidth={60} minLabel="5 yrs" maxLabel="30 yrs" />
          <p className="muted" style={{ fontSize: 12, margin: "12px 0 0" }}>Rates are indicative. Your actual rate depends on lender, credit score and loan amount.</p>
        </div>
        <div className="result-card" aria-live="polite">
          <div className="lbl">Monthly EMI</div>
          <div className="big num">{inr(monthly)}</div>
          <div className="donut-row">
            <svg className="donut" viewBox="0 0 42 42" aria-hidden="true">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#F05E3B" strokeWidth="6" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#fff" strokeWidth="6" strokeDasharray={`${pct.toFixed(1)} ${(100 - pct).toFixed(1)}`} strokeDashoffset="25" style={{ transition: "stroke-dasharray .6s var(--ease)" }} />
            </svg>
            <div className="legend num">
              <div><span><i style={{ background: "#fff" }} />Principal</span><b>{shortInr(loan)}</b></div>
              <div><span><i style={{ background: "#F05E3B" }} />Total interest</span><b>{shortInr(total - loan)}</b></div>
            </div>
          </div>
          <div className="rows num">
            <div><span>Loan amount</span><b>{inr(loan)}</b></div>
            <div><span>Down payment</span><b>{inr(price - loan)}</b></div>
            <div><span>Total payable</span><b>{inr(total)}</b></div>
          </div>
          <div className="flex mt-6">
            <button type="button" className="btn btn--primary" onClick={() => openModal("consult")}>Get Loan Offers</button>
            <Link className="btn btn--white" to={`/properties?mode=buy&max=${stepFor(price)}`}>See matching homes</Link>
          </div>
        </div>
      </div>
      <Reveal className="panel mt-8">
        <div className="flex between" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Repayment <em>Schedule</em></h2>
          <div className="chart-legend"><span><i style={{ background: "var(--navy)" }} />Principal</span><span><i style={{ background: "var(--accent-400)" }} />Interest</span><span><i style={{ background: "var(--star)" }} />Balance</span></div>
        </div>
        <AmortizationChart rows={rows} emiAmount={monthly} loan={loan} />
        <details className="mt-4">
          <summary className="link" style={{ cursor: "pointer" }}>Show year-by-year table</summary>
          <div className="table-scroll mt-4">
            <table className="amort-table num">
              <thead><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Total paid</th><th>Balance</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r.year}><td>Year {r.year}</td><td>{inr(r.principal)}</td><td>{inr(r.interest)}</td><td>{inr(r.principal + r.interest)}</td><td>{inr(r.balance)}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      </Reveal>
    </>
  );
}

function AffordabilityTab() {
  const { openModal } = useApp();
  const [income, setIncome] = useState(150000);
  const [obligations, setObligations] = useState(10000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const affordable = Math.max(0, income * 0.5 - obligations);
  const loan = (affordable / emi(100000, rate, years)) * 100000;
  const budget = loan / 0.8;
  return (
    <div className="calc">
      <div className="panel">
        <SimpleSlider id="inc" label="Net monthly income" min={25000} max={1000000} step={5000} value={income} onChange={setIncome} display={inr(income)} />
        <SimpleSlider id="oblig" label="Existing EMIs per month" min={0} max={300000} step={1000} value={obligations} onChange={setObligations} display={inr(obligations)} />
        <SimpleSlider id="aRate" label="Interest rate" min={6} max={14} step={0.05} value={rate} onChange={setRate} display={`${rate.toFixed(2)}%`} />
        <SimpleSlider id="aYrs" label="Tenure" min={5} max={30} step={1} value={years} onChange={setYears} display={`${years} years`} />
        <p className="muted" style={{ fontSize: 12, margin: 0 }}>Assumes lenders allow total EMIs up to 50% of net income and fund 80% of the property value.</p>
      </div>
      <div className="result-card">
        <div className="lbl">Estimated loan eligibility</div>
        <div className="big num">{shortInr(loan)}</div>
        <div className="rows num">
          <div><span>Affordable EMI</span><b>{inr(affordable)}/mo</b></div>
          <div><span>Property budget (with 20% down)</span><b>{shortInr(budget)}</b></div>
          <div><span>Down payment needed</span><b>{shortInr(budget - loan)}</b></div>
        </div>
        <div className="flex mt-6">
          <Link className="btn btn--primary" to={`/properties?mode=buy&max=${stepFor(budget)}`}>See homes in budget</Link>
          <button type="button" className="btn btn--white" onClick={() => openModal("consult")}>Talk to Loans team</button>
        </div>
      </div>
    </div>
  );
}

function StampDutyTab() {
  const [value, setValue] = useState(12000000);
  const [rate, setRate] = useState(6);
  const [woman, setWoman] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);
  const pct = rate - (woman ? 1 : 0);
  const duty = (value * pct) / 100;
  const reg = Math.min(30000, value * 0.01);
  const gst = underConstruction ? value * 0.05 : 0;
  return (
    <div className="calc">
      <div className="panel">
        <SimpleSlider id="sVal" label="Agreement value" min={1000000} max={100000000} step={100000} value={value} onChange={setValue} display={shortInr(value)} />
        <div className="field field--sm" style={{ marginBottom: 16 }}>
          <label htmlFor="sCity">Property location</label>
          <select className="select select--sm" id="sCity" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
            <option value={6}>Mumbai (municipal limits)</option>
            <option value={7}>Thane / Navi Mumbai / Pune (municipal corporation)</option>
            <option value={6.5}>Other areas (approx.)</option>
          </select>
        </div>
        <label className="check" style={{ marginBottom: 10 }}><input type="checkbox" checked={woman} onChange={(e) => setWoman(e.target.checked)} /> Buying in a woman&apos;s name (1% concession)</label>
        <label className="check"><input type="checkbox" checked={underConstruction} onChange={(e) => setUnderConstruction(e.target.checked)} /> Under-construction (adds 5% GST)</label>
        <p className="muted" style={{ fontSize: 12, margin: "14px 0 0" }}>Indicative only. Rates include metro cess where applicable and change from time to time. Registration fee is 1% capped at ₹30,000. Confirm the exact amount with your advisor.</p>
      </div>
      <div className="result-card">
        <div className="lbl">Estimated total cost</div>
        <div className="big num">{inr(value + duty + reg + gst)}</div>
        <div className="rows num">
          <div><span>Agreement value</span><b>{inr(value)}</b></div>
          <div><span>Stamp duty ({pct}%)</span><b>{inr(duty)}</b></div>
          <div><span>Registration fee</span><b>{inr(reg)}</b></div>
          <div><span>GST</span><b>{gst ? inr(gst) : "—"}</b></div>
        </div>
      </div>
    </div>
  );
}

export default function MortgageCalculator() {
  useDocumentTitle("Home Loan EMI Calculator");
  const { openModal } = useApp();
  return (
    <>
      <PageHero title="Home Loan" highlight="EMI Calculator" crumbs={[["Home Loan"]]} lead="Plan your purchase: monthly EMI, total interest, year-by-year schedule, affordability and indicative stamp duty. Figures are estimates." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <Tabs label="Calculators" style={{ maxWidth: 640 }} tabs={[
            { id: "emi", label: "EMI calculator", content: <EmiTab /> },
            { id: "afford", label: "How much can I borrow?", content: <AffordabilityTab /> },
            { id: "stamp", label: "Stamp duty & costs", content: <StampDutyTab /> }
          ]} />
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <CtaBand title="Get the best home loan," highlight="with one advisor." text="First Advisor Loans compares offers from leading banks and HFCs and handles the paperwork.">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => openModal("consult")}>Get Loan Offers</button>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
