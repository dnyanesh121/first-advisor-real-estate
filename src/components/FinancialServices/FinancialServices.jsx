import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import { SITE } from "../../data/site";

const LoanIcon = () => (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M8 22 24 9l16 13" /><path d="M12 19v8M36 19v3" /><path d="M6 38c4-1 8-5 12-5h8a3 3 0 0 1 0 6h-6" /><path d="M20 39h10l10-6a3 3 0 0 1 3 5L32 45H8" /><circle cx="24" cy="21" r="4" /></svg>);
const InsureIcon = () => (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 44V10l14-5v39M24 14h14v30" /><path d="M15 15h4M15 22h4M15 29h4M15 36h4M29 21h4M29 28h4M29 35h4M4 44h40" /></svg>);
const InvestIcon = () => (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="20" cy="12" rx="12" ry="5" /><path d="M8 12v7c0 2.8 5.4 5 12 5s12-2.2 12-5v-7M8 19v7c0 2.8 5.4 5 12 5M8 26v7c0 2.8 5.4 5 12 5" /><ellipse cx="32" cy="29" rx="10" ry="4" /><path d="M22 29v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6M22 35v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5" /></svg>);

const CARDS = [
  { title: "Home Loans", text: "Eligibility assessment and loan guidance across leading lenders.", Icon: LoanIcon, to: "/mortgage-calculator" },
  { title: "Property Insurance", text: "Protection for your home and assets.", Icon: InsureIcon, href: SITE.groupUrl },
  { title: "Investment Planning", text: "Mutual fund solutions aligned with your long-term goals.", Icon: InvestIcon, href: SITE.groupUrl }
];

export default function FinancialServices() {
  return (
    <section className="section section--white">
      <div className="container">
        <div className="fin">
          <Reveal variant="left">
            <h2>Integrated <em>Financial Services</em></h2>
            <p>Complete Support for Your Property Purchase</p>
            <Link className="btn btn--navy" to="/mortgage-calculator">Explore Our Financial Services</Link>
          </Reveal>
          <div className="grid grid-3">
            {CARDS.map(({ title, text, Icon, to, href }, i) => {
              const body = (<><div className="ic"><Icon /></div><h3>{title}</h3><p>{text}</p></>);
              return (
                <Reveal key={title} delay={0.05 + i * 0.07} style={{ display: "flex" }}>
                  {to
                    ? <Link className="icard" to={to} style={{ flex: 1 }}>{body}</Link>
                    : <a className="icard" href={href} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>{body}</a>}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
