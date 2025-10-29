import styles from './styles.module.css';

import USP from '../CustomUI/Card/USP';
import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';

function Features() {
  const USPs = [
    {
      title: 'Easy Boking',
      description: 'Quick and easy bookings with simple process',
      icon: '/images/easy.png',
    },
    {
      title: 'Customizable',
      description: 'Customize your itinerary to suit your needs',
      icon: '/images/custom.png',
    },
    {
      title: 'Flexible',
      description: 'Bookings can be made on any day of the week',
      icon: '/images/flexible.png',
    },
    {
      title: 'Humanized Process',
      description: "We've got you covered from booking to beyond",
      icon: '/images/human.png',
    },
  ];

  return (
    <section id={styles.features}>
      <div className={styles.featuresBox}>
        <SectionTitle
          title='Our /s Travel Tale\s'
          description="From booking to beyond, we've got you covered"
          variant='center'></SectionTitle>

        <div className={styles.featuresContent}>
          {USPs.map((item, index) => (
            <USP
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
