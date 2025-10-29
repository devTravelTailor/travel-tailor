import styles from './styles.module.css';
import Image from 'next/image';

function Plan({ img, title, className }) {
    return ( 
        <div className={`${styles.planCard} ${className}`}>
            <div className={styles.imageContainer}>
                <Image
                    src={img} 
                    alt={title}
                    className={styles.planImage}
                    width={400}
                    height={560}
                />
                <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
            </div>
        </div>
     );
}

export default Plan;