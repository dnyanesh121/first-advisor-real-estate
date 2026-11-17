import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Logo from "../../assets/icons/Logo";
import Newsletter from "./Newsletter";
import { SITE } from "../../data/site";

const QUICK = [["Home", "/"], ["About Us", "/about"], ["Properties", "/properties"], ["Our Advisors", "/agents"], ["Blog", "/blog"], ["Testimonials", "/testimonials"], ["Contact Us", "/contact"]];
const BUSINESSES = [["Insurance", SITE.groupUrl], ["Mutual Funds", SITE.groupUrl], ["Loans", "/mortgage-calculator"], ["Real Estate", "/"], ["Web and Digital", SITE.groupUrl]];
const LEGAL = ["Privacy Policy", "Disclaimer", "Grievance Redressal", "Terms of Use"];
const SOCIAL = [["fb", "Facebook", "https://www.firstadvisorsinsurance.com/"], ["ig", "Instagram",  "https://www.firstadvisorsinsurance.com/"], ["in", "LinkedIn",  "https://www.firstadvisorsinsurance.com/"], ["yt", "YouTube",  "https://www.firstadvisorsinsurance.com/"]];

const SmartLink = ({ to, children }) =>
  to.startsWith("http") ? <a href={to} target="_blank" rel="noopener noreferrer">{children}</a> : <Link to={to}>{children}</Link>;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Newsletter />
        <div className="fgrid">
          <div>
            <Link to="/" className="logo" style={{ marginBottom: 12 }}><Logo /></Link>
            {/* <p className="legal-txt">{SITE.irda}</p> */}
            <p className="legal-txt" style={{ margin: 0 }}>Copyright © 2016–2029 All Rights Reserved First Advisor Insurance Brokers Pvt. Ltd.</p>
            <div className="socials">
              {SOCIAL.map(([icon, label, url]) => <a key={icon} href={url} aria-label={label}><Icon name={icon} /></a>)}
            </div>
          </div>
          <div><h4>Quick Links</h4><ul>{QUICK.map(([l, to]) => <li key={l}><Link to={to}>{l}</Link></li>)}</ul></div>
          <div><h4>Our Businesses</h4><ul>{BUSINESSES.map(([l, to]) => <li key={l}><SmartLink to={to}>{l}</SmartLink></li>)}</ul></div>
          <div><h4>Legal</h4><ul>{LEGAL.map((l) => <li key={l}><a href="#top">{l}</a></li>)}<li><Link to="/faq">FAQs</Link></li></ul></div>
          <div>
            <h4>Get in touch</h4>
            <ul className="contact">
              <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="phone" /><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li><Icon name="pin" /><span>First Advisor Insurance Brokers Pvt. Ltd.<br />Head Office: {SITE.address}</span></li>
              <li><Icon name="clock" /><span>{SITE.hours}</span></li>
            </ul>
          </div>
        </div>
        {/* <div className="rera"><b>RERA Registration No.:</b> {SITE.rera} | All property information, prices, and availability are indicative and subject to change without prior notice. Clients are advised to verify details independently before making any decision.</div> */}
        {/* <div className="fbottom">
          <span>© {new Date().getFullYear()} First Advisors Group of Companies</span>
          <span>Listings, advisor profiles and reviews are sample content</span>
        </div> */}
      </div>
    </footer>
  );
}
