import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";

// tiny helper to make a tel: URL (strip spaces)
const telHref = (s) => `tel:${String(s || "").replace(/\s+/g, "")}`;

function Footer({ setting }) {
  const LinksRow = ({ title, links = [] }) => (
    <div className={styles.linksRow}>
      <p className={styles.linkTitle}>{title}</p>
      {links.map((link, i) => (
        <Link href={link.url} key={i} className={styles.link}>
          {link.name}
        </Link>
      ))}
    </div>
  );

  // Static sections (keep as-is)
  const Company = [
    { name: "About Us", url: "/about" },
    { name: "Contact Us", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Terms & Conditions", url: "/tnc" },
  ];

  const QuickLinks = [
    { name: "Search", url: "/search" },
    { name: "Destinations", url: "/destinations" },
    { name: "Travel Calender", url: "/calendar" },
  ];

  // Default contact information (if backend data is missing)
  const defaultContact = [
    { name: "+91 9165070409", url: "tel:+91 9165070409" },
    { name: "+91 9993208865", url: "tel:+91 9993208865" },
    { name: "hi@traveltailor.in", url: "mailto:hi@traveltailor.in" },
  ];

  // Fallback contact information if not found in backend
  const fc = setting?.footerContact || {};
  const Contact = [
    fc?.contact1
      ? { name: fc.contact1, url: telHref(fc.contact1) }
      : defaultContact[0],
    fc?.contact2
      ? { name: fc.contact2, url: telHref(fc.contact2) }
      : defaultContact[1],
    fc?.email
      ? { name: fc.email, url: `mailto:${fc.email}` }
      : defaultContact[2],
  ];

  const address =
    fc?.location ||
    "Building no. 77, Jalvihar Colony Rd, Opposite Lions Club, Telibandha, Raipur, Chhattisgarh 492001";
  const brief =
    fc?.brief ||
    "Planning a trip? We’ve got the inside scoop. Destinations, tips, and all the good stuff to make your travels amazing.";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBox}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerLogo}>
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="travel tailor logo"
              />
            </div>

            <div className={styles.mainDescription}>
              <p>{brief}</p>
              <div className={styles.location}>
                <Image
                  src="/images/location.png"
                  width={20}
                  height={20}
                  alt="location"
                />
                <p>{address}</p>
              </div>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <LinksRow title="Company" links={Company} />
            <LinksRow title="Quick Links" links={QuickLinks} />
            <LinksRow title="Contact" links={Contact} />
          </div>
        </div>

        <div className={styles.footerExtra}>
          <p>Copyright 2025. All rights reserved.</p>

          <div className={styles.socials}>
            <Link
              href="https://www.facebook.com/share/1EPxiFRpiR/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/facebook.png"
                width={20}
                height={20}
                alt="facebook"
              />
            </Link>

            <Link
              href="https://www.instagram.com/traveltailor_in?igsh=ZGJ5YWRlajF1a2hy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/instagram.png"
                width={20}
                height={20}
                alt="instagram"
              />
            </Link>

            <Link
              href="https://www.linkedin.com/company/travel-tailor-in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/linkedin.png"
                width={20}
                height={20}
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
