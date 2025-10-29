import styles from './scrollBtn.module.css';
import ArrowBtn from "./ArrowBtn";

function ScrollButtons({ onScrollLeft, onScrollRight }) {
    return (
        <div className={styles.scrollNav}>
            <ArrowBtn direction='left' variant='outline' onClick={onScrollLeft} className={`${styles.arrowBtn} ${styles.left}`}>
            </ArrowBtn>
            <ArrowBtn onClick={onScrollRight} className={`${styles.arrowBtn} ${styles.right}`}>
                &rarr;
            </ArrowBtn>
        </div>
    );
}

export default ScrollButtons;