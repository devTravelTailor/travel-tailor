import React from 'react';
import styles from './styles.module.css';
import parseUrl from '../../util/parseUrl';

const ProfileHeader = ({
  backgroundImg = '/images/main.jpeg',
  profileImage = '/images/avatar.webp',
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
    instagram: '/images/instagram.png',
    youtube: '/images/youtube.png',
    facebook: '/images/facebook.png',
    website: '/images/website.png',
  };

  console.log('profileimg', profileImage, backgroundImg);

  function normalizeUrl(u = '') {
    if (!u) return '';
    return /^https?:\/\//i.test(u) ? u : `https://${u}`;
  }

  const normalizedLinks = Array.isArray(socialLinks)
    ? socialLinks
    : Object.entries(socialLinks || {}).map(([platform, url]) => ({
        platform,
        url,
      }));

  const safeImg = (src, fallback) => {
    const parsed = parseUrl(src);
    return parsed || fallback;
  };

  const bgImg = safeImg(backgroundImg, '/images/main.jpeg');
  const profileImg = safeImg(profileImage, '/images/avatar.webp');
  const totalTours = tripsCreated || tripsHosted || 0;

  return (
    <div
      className={styles.profileContainer}
      style={{ '--cover-img': `url(${bgImg})` }}>
      <div className={styles.coverOverlay} />

      <div className={styles.headerContent}>
        <div
          className={styles.portrait}
          style={{ backgroundImage: `url(${profileImg})` }}
        />

        <div className={styles.infoBlock}>
          <div className={styles.titleRow}>
            <h1 className={styles.profileName}>{name}</h1>
            <span className={styles.tourCount}>{totalTours} tours</span>
          </div>
          {location && <p className={styles.location}>{location}</p>}
          {normalizedLinks?.length > 0 && (
            <div className={styles.socialLinks + ' flex justify-center'}>
              {normalizedLinks
                .filter((it) => it?.url && ICONS[it.platform?.toLowerCase()])
                .map((it) => {
                  const platform = String(it.platform).toLowerCase();
                  const href = normalizeUrl(it.url);
                  return (
                    <a
                      key={`${platform}-${href}`}
                      href={href}
                      target='_blank'
                      rel='noreferrer noopener'
                      aria-label={platform}>
                      <img
                        src={ICONS[platform]}
                        alt={
                          platform.charAt(0).toUpperCase() + platform.slice(1)
                        }
                        className={styles.socialIcon}
                      />
                    </a>
                  );
                })}
            </div>
          )}

          {bio && <p className={styles.bio}>{bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
