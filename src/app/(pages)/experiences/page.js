import List from '../../components/List/List';
import styles from './styles.module.css';

export const revalidate = 300;

async function getExperienceData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      console.warn(
        'Skipping experiences list fetch: NEXT_PUBLIC_API_URL is not set.',
      );
      return null;
    }

    const authToken =
      process.env.NEXT_PUBLIC_API_TOKEN ||
      process.env.NEXT_PUBLIC_TOKEN ||
      process.env.API_TOKEN;

    const response = await fetch(`${baseUrl}/api/site_experienceslist/`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.warn(
          `Skipping experiences list fetch: received ${response.status}.`,
        );
        return null;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error('Failed to load experiences list:', err);
    return null;
  }
}

export default async function ExperiencesPage() {
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
}
