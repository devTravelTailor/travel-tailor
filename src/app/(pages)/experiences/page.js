'use client';

import { useState, useEffect } from 'react';
import List from '../../components/List/List';
import Spinner from '../../components/CustomUI/Spinner/Spinner';
import styles from './styles.module.css';

export default function ExperiencesPage() {
  const [experienceData, setExperienceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/site_experienceslist/`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data', data);

        setExperienceData(data.data);
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
        setError(err.message || 'Failed to fetch experience data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.experiences}>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div
          style={{
            padding: 'var(--pd-page)',
            color: 'red',
            textAlign: 'center',
          }}>
          Error: {error}
        </div>
      ) : !experienceData ||
        !experienceData.group ||
        experienceData.group.length === 0 ? (
        <div
          style={{
            padding: 'var(--pd-page)',
            textAlign: 'center',
            color: 'var(--color-grey)',
          }}>
          No experiences found.
        </div>
      ) : (
        <List
          data={experienceData}
          itemBasePath='/experiences'
          itemKeyName='experiences'
        />
      )}
    </section>
  );
}
