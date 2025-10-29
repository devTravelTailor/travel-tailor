import Link from "next/link";

function Button({
  children = "Explore more",
  className = "",
  href = "/",
  varient = "fill",
  type = "link",
  ...props
}) {
  const classes = `btn ${varient} ${className}`.trim();

  if (type === "block") {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}

export default Button;
