"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import Button from "../CustomUI/Button/Button";
// ⬇️ update the path to where your dialog lives
import { AuthDialog } from "../Auth/authDialog";

function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Search", href: "/search", icon: "/images/search.png" },
    { name: "Destinations", href: "/destinations" },
    { name: "Blogs", href: "/blogs" },
    { name: "Tours", href: "/tours" },
    { name: "Calendar", href: "/calendar" },
    { name: "Experiences", href: "/experiences" },
    { name: "About", href: "/about" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch user data and check for token on page load
    try {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);

      if (savedToken) {
        async function fetchUser() {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
            {
              headers: {
                Authorization: `Bearer ${savedToken}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            localStorage.removeItem("token");
          }
        }

        fetchUser();
      }
    } catch (error) {
      console.error("Error fetching user or token", error);
    }
  }, []);

  const isCreator = useMemo(() => {
    const role =
      user?.roleName || user?.role || user?.user?.roleName || user?.user?.role;
    return String(role || "").toLowerCase() === "creator";
  }, [user]);

  const dashboardUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_URL ||
    process.env.NEXT_PUBLIC_CREATOR_DASHBOARD_URL ||
    "/dashboard";

  const handleClick = () => setIsOpen((p) => !p);
  const closeMenu = () => setIsOpen(false);

  const handleAuthSuccess = (payload) => {
    try {
      localStorage.setItem("tt_user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      setUser(payload.user);
      setToken(payload.token);
    } catch (error) {
      console.error("Error during authentication success", error);
    }
    setAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("tt_user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navBox}>
          <div className={styles.navLogo}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Travel Tailor Logo"
                width={100}
                height={50}
              />
            </Link>
          </div>

          {/* Nav Items Desktop */}
          <div className={styles.navItemsDesktop}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${styles.navItem} ${
                  pathname.startsWith(item.href) ? styles.active : ""
                }`}
              >
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                )}
                <p>{item.name}</p>
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className={styles.navActions}>
            <Button varient="color" href="/contact">
              Start Planning
            </Button>

            {isCreator ? (
              <Link href={dashboardUrl} className={styles.btnOutline}>
                Dashboard
              </Link>
            ) : token ? (
              <button className={styles.btnOutline} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                type="button"
                className={styles.btnOutline}
                onClick={() => setAuthOpen(true)}
              >
                Login
              </button>
            )}
          </div>

          <div className={styles.navMenuIcon}>
            <button onClick={handleClick} className={styles.navMenuIconBtn}>
              <Image
                src="/images/menu.png"
                alt="Menu Icon"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {/* Nav Items Mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            className={`${styles.navItemsMobile} ${isOpen && styles.active}`}
            key={isOpen ? "open" : "closed"}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={styles.navItem}
                onClick={closeMenu}
              >
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                )}
                <p>{item.name}</p>
              </Link>
            ))}

            <div className={styles.navMobileActions}>
              <Link
                href="/contact"
                className={styles.btnPrimary}
                onClick={closeMenu}
              >
                Start Planning
              </Link>

              {isCreator ? (
                <Link
                  href={dashboardUrl}
                  className={styles.btnOutline}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  type="button"
                  className={styles.btnOutline}
                  onClick={() => {
                    setAuthOpen(true);
                    closeMenu();
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </nav>

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default Navbar;
