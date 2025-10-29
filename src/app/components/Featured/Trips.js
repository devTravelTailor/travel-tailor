import styles from "./styles.module.css";

import SectionTitle from "../CustomUI/SectionTitle/SectionTitle";
import Tour from "../CustomUI/Card/Tour";
import Button from "../CustomUI/Button/Button";
function Trips({ trips }) {
  // trips = [
  //     {
  //         "id": 9,
  //         "documentId": "x17axnljyeba2pzkkbmd24lu",
  //         "slug": "inca-trail-to-machu-picchu-trek",
  //         "title": "Inca Trail to Machu Picchu Trek",
  //         "Place": "Machu Picchu",
  //         "brief": "Trek the legendary Inca Trail to Machu Picchu, experiencing stunning Andean landscapes and ancient Inca sites",
  //         "createdAt": "2025-03-08T08:24:58.237Z",
  //         "updatedAt": "2025-03-08T08:24:58.237Z",
  //         "publishedAt": null,
  //         "locale": "en",
  //         "description": "Witness the magical sunrise over Machu Picchu",
  //         "priceTime": {
  //             "id": 9,
  //             "pricePerPerson": "30000",
  //             "nights": "4"
  //         },
  //         "imgUrl": "/uploads/kirti_kalla_J_Rhvll_D_Bhzs_unsplash_6c581935d5.jpg"
  //     },
  //     {
  //         "id": 7,
  //         "documentId": "e954jyp4hkmf15zufe4w6tvr",
  //         "slug": "maldives-overwater-bliss",
  //         "title": "Maldives Overwater Bliss",
  //         "Place": "Maldives",
  //         "brief": "Indulge in the ultimate relaxation in Maldives' overwater bungalows, with turquoise waters and stunning sunsets",
  //         "createdAt": "2025-03-08T08:21:24.476Z",
  //         "updatedAt": "2025-03-08T08:21:24.476Z",
  //         "publishedAt": null,
  //         "locale": "en",
  //         "description": "Unwind in paradise with unparalleled luxury and serenity",
  //         "priceTime": {
  //             "id": 7,
  //             "pricePerPerson": "20000",
  //             "nights": "3"
  //         },
  //         "imgUrl": "/uploads/bernardo_lorena_ponte_ddcb_YY_4t_Ly_U_unsplash_9a0b877464.jpg"
  //     },
  //     {
  //         "id": 1,
  //         "documentId": "o0qs44d75c8e06aiw75v5dfn",
  //         "slug": "kyoto-zen-and-gardens-tour",
  //         "title": "Kyoto Zen & Gardens Tour",
  //         "Place": "Kyoto, Japan",
  //         "brief": "Immerse yourself in the serene beauty of Kyoto's Zen gardens and traditional temples. Experience tranquility and Japanese culture",
  //         "createdAt": "2025-03-08T07:44:39.092Z",
  //         "updatedAt": "2025-03-08T07:44:39.092Z",
  //         "publishedAt": null,
  //         "locale": "en",
  //         "description": "A peaceful journey through Kyoto's spiritual heart",
  //         "priceTime": {
  //             "id": 1,
  //             "pricePerPerson": "10000",
  //             "nights": "4"
  //         },
  //         "imgUrl": "/uploads/bernardo_lorena_ponte_ddcb_YY_4t_Ly_U_unsplash_9a0b877464.jpg"
  //     }
  // ]
  return (
    <section id={styles.featuredTrips}>
      <div className={styles.tripsBox}>
        <SectionTitle
          title="Best on /n /sTravel Tailor\s"
          description="These are the most enjoyed and loved trips of 2025 by travellers"
          className={styles.tripsTitle}
          variant="center"
        />

        <div className={styles.tripsContent}>
          {trips &&
            trips.map((trip, index) => (
              <Tour
                key={index}
                slug={trip.slug}
                title={trip.title}
                description={trip.description}
                imgUrl={trip.heroImg}
                type="tours"
                tag={`${trip?.details?.totalDays} Days`}
              />
            ))}
        </div>

        <Button href="/tours" varient="outline" className="sw">
          View more
        </Button>
      </div>
    </section>
  );
}

export default Trips;
