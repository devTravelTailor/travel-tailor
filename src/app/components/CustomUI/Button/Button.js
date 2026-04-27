"use client";

import Link from "next/link";

function Button({
  children = "Explore more",
  className = "",
  href = "/",
  varient = "fill",
  type = "link",
  onClick,
  ...props
}) {
  const classes = `btn ${varient} ${className}`.trim();

  const handleClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event);
      if (event.defaultPrevented) return;
    }

    if (typeof href === "string" && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (type === "block") {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Link className={classes} href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export default Button;
