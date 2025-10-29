import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';


import Button from '../Button/Button';
function Brief({
    title = "Brief about this trip",
    description = "",
    className = "",
    imgUrl = "/images/banner.jpg",
    url = "/contact",
    ...props
}) {

    if (!imgUrl) {
        return null;
    }

    return ( 
        <section className={styles.brief}>
                <div className={styles.briefBox}>
                    <div className={styles.briefContent}>
                        <h3 className={styles.briefTitle}>{title}</h3>
                        <p className={styles.briefDescription}>{description}</p>
                    </div>

                    <Link className={styles.briefImgBox} href={url}>
                        <Image
                            src={imgUrl}
                            alt={title}
                            width={340}
                            height={330}
                            className={styles.briefImg}
                            priority={true}
                        />

                        <Button 
                            className={styles.briefBtn}
                            varient="fill"
                            type="block"
                        >Enquire now</Button>
                    </Link>
                </div>
        </section>
     );
}

export default Brief;