import styles from './styles.module.css';

const TabNavigation = ({ activeTab, onTabChange }) => {
    const tabs = ['popularDestinations', 'byTraveller', 'byMonth', 'experiences'];



    function formatTabName(tab) {
        switch (tab) {
          case 'popularDestinations':
            return 'Popular Destinations';
          case 'byTraveller':
            return 'By Traveller';
          case 'byMonth':
            return 'By Month';
          case 'experiences':
            return 'Experiences';
          default:
            return 'Popular Destinations';
        } 
      }
    
    return (
      <div className={styles.tabNavigation}>
        {tabs.map(tab => (
          <div 
            key={tab} 
            className={`${styles.tab} ${tab === activeTab ? styles.active : ''}`}
            onClick={() => onTabChange(tab)}
          >
            <span className={`${styles.tabLabel} ${tab === activeTab ? styles.active : ''}`}>
              {formatTabName(tab)}
            </span>
          </div>
        ))}
      </div>
    );
  };


export default TabNavigation;

// Format tab name for display
