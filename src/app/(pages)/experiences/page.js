import List from '../../components/List/List';
import styles from './styles.module.css';

export const revalidate = 300;

async function getExperienceData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/site_experienceslist/`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

export default async function ExperiencesPage() {
  try {
    const experienceData = await getExperienceData();

    return (
      <section className={styles.experiences}>
        {!experienceData ||
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
  } catch (err) {
    return (
      <section className={styles.experiences}>
        <div
          style={{
            padding: 'var(--pd-page)',
            color: 'red',
            textAlign: 'center',
          }}>
          Error: {err.message}
        </div>
      </section>
    );
  }
}
