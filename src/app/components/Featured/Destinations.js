import styles from "./styles.module.css";

import Button from "../CustomUI/Button/Button";
import Tour from "../CustomUI/Card/Tour";

import parsePrice from "../../util/parsePrice";

function Destinations({ destinations }) {
  console.log("destinations", destinations);

  return (
    <div className={styles.destinations}>
      <div className={styles.destinationsBox}>
        {destinations.map((destination) => (
          <Tour
            key={destination.title}
            className={styles.boxItem}
            slug={destination.slug}
            title={destination.title}
            description={destination.description}
            imgUrl={destination.heroImg}
            price={destination.startingPrice}
            type="destinations"
            tag={`Trips starting from ${parsePrice(destination.startingPrice)}`}
          />
        ))}
      </div>

      <Button className="sm" varient="outline" href="/destinations">
        View all
      </Button>
    </div>
  );
}

export default Destinations;
