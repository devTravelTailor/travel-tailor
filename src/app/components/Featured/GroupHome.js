"use client";
import styles from "./styles.module.css";

import { useState } from "react";

import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";

import TabNavigation from "./TabNavigation";

import Destinations from "./Destinations";
import Experiences from "./Experiences";
import Calender from "./Calender";

function GroupHome({ destinations, months, traveller, expereinces }) {
  const [activeTab, setActiveTab] = useState("popularDestinations");
  console.log("destinations", destinations);

  const renderContent = () => {
    switch (activeTab) {
      case "popularDestinations":
        return <Destinations destinations={destinations} />;
      case "byTraveller":
        return <Experiences expereinces={expereinces} />;
      case "byMonth":
        return <Calender months={months} />;
      case "experiences":
        return <Experiences expereinces={traveller} />;
      default:
        return <Destinations />;
    }
  };

  return (
    <section id={styles.groupHome}>
      <div className={styles.groupHomeBox}>
        <div className={styles.groupHomeNav}>
          <SectionTitle title="Get Set /sTravel...\s" variant="center" />

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {renderContent()}
      </div>
    </section>
  );
}

export default GroupHome;
