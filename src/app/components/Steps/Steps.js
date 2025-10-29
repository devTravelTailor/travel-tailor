import styles from './styles.module.css';

import USP from '../CustomUI/Card/USP';
import SectionTitle from '../CustomUI/SectionTitle/SectionTitle';

function Steps() {
  const USPs = [
    {
      title: 'Dream & Discuss',
      description:
        "Tell us your travel dreams- we'll explore your preferences and needs, all with no cost to you.",
      icon: '/images/dream.png',
    },
    {
      title: 'Tailor & Plan',
      description:
        "We'll craft a personalized itinerary with flights, stays, and activities that suit your unique style.",
      icon: '/images/plan.png',
    },
    {
      title: 'Book & Confirm',
      description:
        "Once you approve the plan, we'll handle all bookings and confirmations to ensure a smooth trip.",
      icon: '/images/confirm.png',
    },
    {
      title: 'Travel & Support',
      description:
        'And voila! Enjoy your trip with peace of mind, knowing our team is here 24/7 to help with any needs or changes.',
      icon: '/images/travel.png',
    },
  ];

  return (
    <section id={styles.features}>
      <div className={styles.featuresBox}>
        <SectionTitle
          title='Steps to your /sDream Trip\s'
          description='see how we can work together to make your dream trip a reality'
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

export default Steps;
