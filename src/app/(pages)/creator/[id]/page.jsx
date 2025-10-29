"use client";

import ProfileHeader from "../../../components/Creator/ProfileHeader";
import Preview from "../../../components/CustomUI/Card/Preview";
import Tour from "../../../components/CustomUI/Card/Tour";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TourGridSection from "../../../components/Creator/TourGridSection";
import BlogGridSection from "../../../components/Creator/BlogGridSection";

// ✅ This receives the route parameter like /create/123 → params.id = "123"
export default function Page({ params }) {
  const { id } = useParams(params);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        console.log("data", data);

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(profileData);

  return (
    <div>
      <ProfileHeader
        backgroundImg={profileData?.user?.backgroundImg}
        profileImage={profileData?.user?.profileImg}
        name={profileData?.user?.name}
        bio={profileData?.user?.bio}
        location={profileData?.user?.location}
        socialLinks={profileData?.user?.social}
        badges={profileData?.badges}
        stats={profileData?.blog?.length || 0}
        createdAt={profileData?.user?.createdAt}
        tripsHosted={profileData?.tour?.length || 0}
      />

      {/* Tours Grid */}
      {profileData?.tour?.length > 0 && (
        <TourGridSection
          title="Curated Tours"
          allUrl={`/creator/alltours/${id}`}
          type={`tours`}
          description="Curated group trips that connect people, cultures, and unforgettable memories—shared by real travelers like you."
          data={profileData?.tour}
          CardComponent={Tour}
          visibleCount={4}
        />
      )}
      {profileData?.blog?.length > 0 && (
        <BlogGridSection
          title="Latest Blogs"
          url={`/creator/blogs`}
          allUrl={`/creator/allblogs/${id}`}
          data={profileData?.blog}
          description="We have a few blogs post you might like to read about travelling, travelling tips, and more."
          CardComponent={Preview}
          type="blogs"
          visibleCount={4}
        />
      )}
    </div>
  );
}
