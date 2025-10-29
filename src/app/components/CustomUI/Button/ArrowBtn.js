import Link from "next/link";

function ArrowBtn({
  direction = "right",
  variant = "filled",
  label,
  className = "",
  href,
  onClick,
  ...props
}) {
  const classes = `arrow-btn ${variant} ${direction} ${className}`.trim();
  
  const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 4.5L21 12L13.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ButtonContent = () => (
    <>
      <ArrowIcon />
    </>
  );

  const renderButton = () => {
    if (onClick) {
      return (
        <button className={classes} onClick={onClick} {...props}>
          <ButtonContent />
        </button>
      );
    }
    
    if (href) {
      return (
        <Link className={classes} href={href} {...props}>
          <ButtonContent />
        </Link>
      );
    }
    
    return (
      <div className={classes} {...props}>
        <ButtonContent />
      </div>
    );
  };

  if (label) {
    return (
      <div className="arrow-btn-container">
        {renderButton()}
        <span className="arrow-btn-label">{label}</span>
      </div>
    );
  }

  return renderButton();
}

export default ArrowBtn;