// app/destinations/page.jsx
import TextList from "../../components/TextList/TextList";
import Spinner from "../../components/CustomUI/Spinner/Spinner";
import styles from "./styles.module.css";

export const revalidate = 120; // cache for 2 minutes

export default async function DestinationsPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/site_destinationslist/`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: "force-cache",
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    const destinationsArray = data.data;

    if (!destinationsArray || destinationsArray.group.length === 0) {
      return (
        <section className={styles.destinations}>
          <div className="text-center text-gray-500 p-10">
            No destinations found.
          </div>
        </section>
      );
    }

    return (
      <section className={styles.destinations}>
        <TextList
          data={destinationsArray}
          itemBasePath="/destinations"
          itemKeyName="destinations"
        />
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return (
      <section className={styles.destinations}>
        <div className="text-center text-red-500 p-10">
          Failed to load destinations.
        </div>
      </section>
    );
  }
}
