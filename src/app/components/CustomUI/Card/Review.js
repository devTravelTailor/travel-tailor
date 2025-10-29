import styles from './styles.module.css';
import Image from 'next/image';


function Review({
    review,
    name,
    source = 'google',
    className= "",
    ...props
}) {
    return ( 
        <div className={`${styles.review} ${className}`}>
            <div className={styles.reviewContent}>
                <div className={styles.reviewIcon}>
                    <Image src="/images/quote.png" width={40} height={40} className={styles.reviewIcon} alt='quote' />
                </div>

                <p className={styles.message}>{review}</p>
            </div>
            
            <div className={styles.source}>
                <p className={styles.personName}>{name}</p>

                <Image src={`/images/${source}.png`} width={70} height={70} className={styles.reviewSourceIcon} alt={source} />
            </div>

        </div>
     );
}

export default Review;