import React from "react";
import styles from "./styles.module.css";
import parseDate from "../../util/parseDate";

const ProfileHeader = ({
  backgroundImg = "/images/main.jpeg",
  profileImage = "/images/avatar.webp",
  name,
  bio,
  location,
  tripsCreated,
  tripsHosted = 0,
  rating,
  socialLinks,
  badges,
  stats = 0,
  createdAt,
}) => {
  const ICONS = {
    instagram: "/images/instagram.png",
    youtube: "/images/youtube.png",
    facebook: "/images/facebook.png",
  };

  function normalizeUrl(u = "") {
    if (!u) return "";
    return /^https?:\/\//i.test(u) ? u : `https://${u}`;
  }

  const normalizedLinks = Array.isArray(socialLinks)
    ? socialLinks
    : Object.entries(socialLinks || {}).map(([platform, url]) => ({
        platform,
        url,
      }));

  const bgImg = backgroundImg == "" ? "/images/main.jpeg" : backgroundImg;

  const profileImg = profileImage == "" ? "/images/avatar.webp" : profileImage;
  return (
    <div className={styles.profileContainer}>
      {/* Cover Image */}
      <div className={styles.coverImageWrapper}>
        <img src={bgImg} alt="Cover" className={styles.coverImage} />

        <div className={styles.profileImageSection}>
          <div className={styles.profileImgWrapper}>
            <img src={profileImg} alt="Profile" className={styles.profileImg} />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        <div className={styles.profileText}>
          <h1 className={styles.profileName}>{name}</h1>
          <p className={styles.profileLocation}>{location}</p>
          <p className={styles.profileBio}>{bio}</p>
        </div>
        {/* STATS WRAPPER */}
        <div className={styles.profileStatsWrapper}>
          <div className={styles.profileStats}>
            <div>
              <strong>Trips Hosted:</strong> {tripsHosted}
            </div>

            <div>
              <strong>blogs:</strong> {stats}
            </div>
            <div>
              <strong>Joined:</strong> {parseDate(createdAt)}
            </div>
          </div>

          <div className={styles.socialLinks}>
            {normalizedLinks
              .filter((it) => it?.url && ICONS[it.platform?.toLowerCase()])
              .map((it) => {
                const platform = String(it.platform).toLowerCase();
                const href = normalizeUrl(it.url);
                return (
                  <a
                    key={`${platform}-${href}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={platform}
                  >
                    <img
                      src={ICONS[platform]}
                      alt={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      className={styles.socialIcon}
                    />
                  </a>
                );
              })}
          </div>
        </div>

        {/* Stats Section */}
      </div>
    </div>
  );
};

export default ProfileHeader;
