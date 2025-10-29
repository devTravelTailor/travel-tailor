"use client";

import Calender from "../../components/Featured/Calender";
import Spinner from "../../components/CustomUI/Spinner/Spinner";
import { useState, useEffect } from "react";

import styles from "./styles.module.css";

export default function CalenderPage() {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/months/?page=1&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMonths(data.data.items);
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.calender}>
        {months?.length > 0 ? <Calender months={months} /> : <Spinner />}
      </div>
    </main>
  );
}
