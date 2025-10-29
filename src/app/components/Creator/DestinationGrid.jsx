import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Calendar, Users } from "lucide-react";
const goaImage =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80";
const keralaImage =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

const destinations = [
  {
    id: 1,
    name: "Goa Beach Paradise",
    location: "Goa, India",
    image: goaImage,
    duration: "5 Days",
    groupSize: "2-8 People",
    price: "₹25,000",
    rating: 4.8,
    description:
      "Experience pristine beaches, vibrant nightlife, and Portuguese heritage in India's beach capital.",
    highlights: [
      "Beach Hopping",
      "Water Sports",
      "Heritage Tours",
      "Beach Parties",
    ],
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    location: "Kerala, India",
    image: keralaImage,
    duration: "7 Days",
    groupSize: "2-6 People",
    price: "₹35,000",
    rating: 4.9,
    description:
      "Cruise through serene backwaters, explore spice plantations, and experience Ayurvedic wellness.",
    highlights: [
      "Houseboat Stay",
      "Spice Gardens",
      "Ayurveda Spa",
      "Local Cuisine",
    ],
  },
  {
    id: 3,
    name: "Rajasthan Royal Heritage",
    location: "Rajasthan, India",
    image: goaImage, // Will generate more images in production
    duration: "10 Days",
    groupSize: "2-12 People",
    price: "₹55,000",
    rating: 4.7,
    description:
      "Discover magnificent palaces, desert landscapes, and royal traditions of Rajasthan.",
    highlights: [
      "Palace Hotels",
      "Desert Safari",
      "Cultural Shows",
      "Heritage Walks",
    ],
  },
];

const DestinationsGrid = () => {
  return (
    <section id="destinations" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="text-orange-500 font-handwriting">
              Destinations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked destinations offering unique experiences,
            stunning landscapes, and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {destinations.map((destination, index) => (
            <Card
              key={destination.id}
              className="group p-0 border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 font-sans px-3 rounded-full text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm font-medium">
                    ⭐ {destination.rating}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {destination.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                    {destination.name}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.highlights
                      .slice(0, 3)
                      .map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{destination.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-auto items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-500">
                        {destination.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        per person
                      </span>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-500/90">
                      Explore Trip
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-orange-500 hover:text-orange-500-foreground"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;
