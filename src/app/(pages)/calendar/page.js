import { Suspense } from "react";
import Calender from "../../components/Featured/Calender";
import styles from "./styles.module.css";

export const revalidate = 300;

export default async function CalenderPage() {
  let months = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/months/?page=1&limit=12`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        cache: "force-cache",
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch months:", res.status);
    } else {
      const data = await res.json();
      months = data?.data?.items || [];
    }
  } catch (err) {
    console.error("Failed to fetch months:", err);
  }

  return (
    <main>
      <div className={styles.calender}>
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#ff5b06] animate-spin" />
            </div>
          }>
          <Calender months={months} />
        </Suspense>
      </div>
    </main>
  );
}
