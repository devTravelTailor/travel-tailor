import React from 'react';
import PolicyTOC from './PolicyTOC';
import PolicyContent from './PolicyContent';
import styles from './layout.module.css';

const PolicyLayout = ({ 
  data, 
  title = "Policy Document", 
  subtitle = "Please read these terms carefully" 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No content available</h2>
        <p>The requested policy document is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className={styles.policyLayout}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Table of Contents - Left Side */}
          <aside className={styles.tocSidebar}>
            <PolicyTOC sections={data} />
          </aside>

          {/* Policy Content - Right Side */}
          <main className={styles.contentMain}>
            <PolicyContent sections={data} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;