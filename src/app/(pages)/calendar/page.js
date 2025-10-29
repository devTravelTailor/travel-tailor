import Calender from "../../components/Featured/Calender";
import Spinner from "../../components/CustomUI/Spinner/Spinner";
import styles from "./styles.module.css";

export const revalidate = 60; // Cache for 60 seconds

export default async function CalenderPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/months/?page=1&limit=12`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      cache: "force-cache",
      next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch months:", res.status);
    return (
      <main className={styles.calender}>
        <Spinner />
      </main>
    );
  }

  const data = await res.json();
  const months = data?.data?.items || [];

  return (
    <main>
      <div className={styles.calender}>
        <Calender months={months} />
      </div>
    </main>
  );
}
