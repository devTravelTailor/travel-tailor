import styles from './styles.module.css';
import Image from 'next/image';

function USP({
    title,
    description,
    className = "",
    icon,
    ...props
}) {
    return ( 
        <div className={`${styles.usp} ${className}`} {...props}>
            <div className={styles.uspIconCircle}>
                <Image
                    src={icon}
                    alt={title}
                    width={40}
                    height={40}
                    className={styles.uspIconImg}
                />
            </div>

            <div className={styles.uspContent}>
                <h5 className={styles.uspTitle}>{title}</h5>
                <p className={styles.uspDescription}>{description}</p>
            </div>
        </div>
    );
}

export default USP;