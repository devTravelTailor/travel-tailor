export const tour = {
  id: "paradise-island-adventure",
  title: "Paradise Island Adventure Tour",
  subtitle: "Discover Hidden Beaches & Ancient Temples",
  location: "Koh Samui, Thailand",
  rating: 4.8,
  reviewCount: 243,
  bookingCount: "30K+",
  badges: ["Bestseller", "Free cancellation"],
  price: {
    from: 189,
    currency: "USD",
  },
  images: {
    hero: "https://images.musement.com/cover/0003/14/koh-samui-xxl-jpg_header-213595.jpeg",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8WRJta-j1bBT2E_m8_SVNYn-1dt4SgKOeK6KU3-V2M6NDqEjTPYNDj4&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8h27chn4VKZghiyT8vNjFH77h-_Qi1tMJS-q9uaAsX--wTCNaYhxLu1s&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm60uXE9r-5gZ8JVjcjXNPOj481ggNO6IU8a1CXtNaxGOOC4uekV2uDLjP&s=10",
    ],
  },
  overview: {
    duration: "3 days",
    groupSize: "10 people",
    ageRange: "18-99 yrs",
    languages: ["English", "Thai", "French"],
    description:
      "Embark on an unforgettable journey through Thailand's most pristine islands. This exclusive adventure combines crystal-clear waters, ancient temple exploration, and authentic local culture. Swim in hidden lagoons, discover secluded beaches, and experience the magic of traditional Thai hospitality in this carefully curated 3-day experience.",
  },
  highlights: [
    {
      title: "Hidden Beach Paradise",
      brief:
        "Discover secret beaches accessible only by traditional longtail boats, where pristine white sand meets crystal-clear turquoise waters",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
    },
    {
      title: "Ancient Temple Exploration",
      brief:
        "Explore sacred Buddhist temples with centuries of history and participate in traditional blessing ceremonies",
      img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=500",
    },
    {
      title: "Waterfall Adventure",
      brief:
        "Trek through tropical rainforest to reach spectacular waterfalls with natural swimming pools",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
    },
    {
      title: "Cultural Immersion",
      brief:
        "Learn traditional Thai cooking, witness cultural performances, and interact with local communities",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    },
  ],
  included: [
    "All transportation by air-conditioned vehicle and traditional boats",
    "Professional English-speaking guide",
    "All meals (breakfast, lunch, dinner)",
    "Snorkeling equipment and safety gear",
    "Temple entrance fees",
    "Professional photography service",
    "Travel insurance",
    "Hotel pickup and drop-off",
  ],
  excluded: [
    "Personal expenses and souvenirs",
    "Alcoholic beverages",
    "Tips and gratuities",
    "Spa treatments",
    "International flights",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Temple Discovery",
      blocks: [
        {
          time: "9:00 AM",
          title: "Hotel Pickup & Welcome Briefing",
          activity:
            "Meet your professional guide at hotel lobby for welcome briefing and tour overview",
          notes: "Please be ready 5 minutes before pickup time",
          image:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
        },
        {
          time: "10:30 AM",
          title: "Wat Chalong Temple Complex Visit",
          activity:
            "Explore the most important Buddhist temple in Phuket with guided cultural tour",
          notes: "Modest dress required - shoulders and knees covered",
          image:
            "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400",
        },
        {
          time: "12:30 PM",
          title: "Traditional Thai Lunch",
          activity:
            "Authentic Thai cuisine at award-winning local restaurant with vegetarian options",
          notes: "Dietary restrictions can be accommodated",
        },
        {
          time: "2:00 PM",
          title: "Beachfront Accommodation Check-in",
          activity:
            "Check-in to luxury beachfront resort with ocean view rooms and welcome amenities",
          notes: "Early check-in guaranteed for tour guests",
        },
        {
          time: "6:00 PM",
          title: "Secret Beach Sunset Experience",
          activity:
            "Private sunset viewing at secluded Secret Beach with complimentary refreshments",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        },
      ],
    },
    {
      day: 2,
      title: "Island Hopping & Snorkeling",
      blocks: [
        {
          time: "8:00 AM",
          title: "Longtail Boat Departure",
          activity:
            "Traditional longtail boat journey to pristine islands with experienced local captain",
          notes: "Light breakfast provided on board",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        },
        {
          time: "10:00 AM",
          title: "Coral Garden Bay Snorkeling",
          activity:
            "Snorkeling adventure in crystal-clear waters with vibrant coral formations and tropical fish",
          notes: "All snorkeling equipment and life jackets provided",
        },
        {
          time: "12:30 PM",
          title: "Beach Picnic Lunch",
          activity:
            "Fresh seafood picnic lunch served on pristine white sand beach with palm trees",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        },
        {
          time: "2:30 PM",
          title: "Hidden Caves & Lagoons Exploration",
          activity:
            "Discover secret caves and emerald lagoons accessible only by traditional boats",
          notes: "Waterproof bags provided for personal items",
        },
        {
          time: "4:00 PM",
          title: "Traditional Fishing Experience",
          activity:
            "Learn traditional fishing techniques with local fishermen and try your catch",
          notes: "Catch and release policy for conservation",
        },
        {
          time: "7:00 PM",
          title: "Cultural Show & Dinner",
          activity:
            "Traditional Thai cultural performance followed by authentic dinner with local delicacies",
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
        },
      ],
    },
    {
      day: 3,
      title: "Waterfall Trek & Departure",
      blocks: [
        {
          time: "9:00 AM",
          title: "Tropical Rainforest Trek",
          activity:
            "Guided trek through lush tropical rainforest with wildlife spotting opportunities",
          notes: "Moderate fitness level required - hiking boots recommended",
          image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
        },
        {
          time: "11:30 AM",
          title: "Paradise Waterfall Swimming",
          activity:
            "Refreshing swim at the spectacular Paradise Waterfall with natural rock pools",
          notes: "Changing facilities and towels provided",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        },
        {
          time: "1:00 PM",
          title: "Authentic Cooking Class",
          activity:
            "Learn to prepare traditional Thai dishes with local chef using fresh ingredients",
          notes: "Recipe cards provided to take home",
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        },
        {
          time: "3:00 PM",
          title: "Final Ocean View Lunch",
          activity:
            "Farewell lunch at clifftop restaurant with panoramic ocean views and photo opportunities",
          notes: "Group photo session included",
        },
        {
          time: "5:00 PM",
          title: "Hotel Drop-off & Departure",
          activity:
            "Comfortable transfer back to hotel with tour completion certificates and contact exchange",
          notes: "Airport transfers can be arranged separately",
        },
      ],
    },
  ],
  tourType: "selectable_date", // Set the tour type, can be "fixed_date", "selectable_date", or "both"
  dateRange: {
    startDate: "2024-11-01T00:00:00.000Z", // Example fixed start date
    endDate: "2024-11-03T00:00:00.000Z", // Example fixed end date
  },
  reviews: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      date: "March 2024",
      title: "Absolutely magical experience!",
      content:
        "This tour exceeded all my expectations. The hidden beaches were breathtaking, and our guide was incredibly knowledgeable about local history and culture. The photography service was a wonderful touch - we got amazing shots we never could have taken ourselves.",
      photos: [
        "/attached_assets/generated_images/Traditional_boat_on_beach_9a7724ad.png",
        "/attached_assets/generated_images/Tropical_waterfall_landscape_view_7637621b.png",
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      date: "February 2024",
      title: "Perfect for nature lovers",
      content:
        "The snorkeling was incredible - so many colorful fish and coral formations. The waterfall trek was challenging but so worth it. Highly recommend for anyone who loves adventure and natural beauty.",
      photos: [],
    },
    {
      id: 3,
      name: "Emma Williams",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 4,
      date: "January 2024",
      title: "Great cultural immersion",
      content:
        "Loved learning about Thai culture and traditions. The cooking class was a highlight, and the temple visits were fascinating. Small group size made it feel very personal and intimate.",
      photos: [
        "/attached_assets/generated_images/Mountain_forest_hiking_trail_d7092cd7.png",
      ],
    },
  ],
  faq: [
    {
      question: "What should I bring on the tour?",
      answer:
        "We recommend bringing sunscreen, a hat, comfortable walking shoes, swimwear, a waterproof bag for your belongings, and a camera. All snorkeling equipment and safety gear are provided.",
    },
    {
      question: "Is this tour suitable for non-swimmers?",
      answer:
        "Yes! While we offer snorkeling activities, participation is optional. Life jackets are provided for all water activities, and our guides are trained in water safety. There are plenty of beach and cultural activities for non-swimmers to enjoy.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "You can cancel up to 24 hours in advance for a full refund. For cancellations within 24 hours, a 50% refund applies. Weather-related cancellations receive a full refund or rebooking option.",
    },
    {
      question:
        "Are meals included and can dietary restrictions be accommodated?",
      answer:
        "All meals are included in the tour price. We can accommodate most dietary restrictions including vegetarian, vegan, gluten-free, and halal options. Please inform us of any dietary requirements when booking.",
    },
    {
      question: "What is the best time of year for this tour?",
      answer:
        "This tour operates year-round, but the best weather conditions are typically from November to April when rainfall is minimal and seas are calmer. During monsoon season (May-October), some activities may be modified for safety.",
    },
  ],
  stays: [
    {
      hotelName: "Paradise Beach Resort",
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c8a4?w=500",
      ],
      description:
        "Luxury beachfront resort with ocean view rooms, infinity pool, spa services, and direct beach access. All rooms feature modern amenities, private balconies, and traditional Thai decor.",
      address: "123 Beach Road, Koh Samui, Surat Thani 84320, Thailand",
      rating: 4.8,
    },
    {
      hotelName: "Jungle View Lodge",
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
      ],
      description:
        "Eco-friendly lodge nestled in tropical rainforest with stunning views of waterfalls and wildlife. Features sustainable architecture and organic dining options.",
      address: "456 Forest Trail, Koh Samui National Park, Thailand",
      rating: 4.6,
    },
  ],
  moments: [
    {
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      altText: "Sunset view from secret beach",
      description:
        "Capture the perfect sunset moment at our exclusive secret beach location, where golden hour creates magical photography opportunities every evening.",
    },
    {
      img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
      altText: "Traditional longtail boat journey",
      description:
        "Experience authentic Thai culture aboard traditional longtail boats as you navigate through emerald waters and hidden lagoons.",
    },
    {
      img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600",
      altText: "Buddhist temple blessing ceremony",
      description:
        "Participate in ancient blessing ceremonies at sacred temples and witness the spiritual heritage of Thailand come alive.",
    },
    {
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
      altText: "Waterfall swimming adventure",
      description:
        "Refresh yourself in natural rock pools beneath spectacular waterfalls after an adventurous trek through lush tropical rainforest.",
    },
    {
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
      altText: "Thai cooking class experience",
      description:
        "Master the art of authentic Thai cuisine with expert local chefs using fresh ingredients from local markets and traditional techniques.",
    },
    {
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
      altText: "Island hopping by speedboat",
      description:
        "Explore multiple pristine islands in a single day, each offering unique landscapes, coral reefs, and untouched natural beauty.",
    },
  ],
  mapEmbed:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.55086077655!2d99.90842673671875!3d9.508348500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f3e96e2a7e7b%3A0x5017e8f7fd388c0!2sKoh%20Samui%2C%20Ko%20Samui%20District%2C%20Surat%20Thani%2C%20Thailand!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  tagMonths: [
    {
      month: "november",
      monthTag: "best-weather",
      displayImg:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      heroImg:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      highlight: {
        title: "Perfect Weather Season",
        brief: "Ideal conditions with minimal rainfall and calm seas",
      },
    },
    {
      month: "december",
      monthTag: "peak-season",
      displayImg:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      heroImg:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      highlight: {
        title: "Peak Tourism Season",
        brief: "Clear skies and perfect temperatures for all activities",
      },
    },
    {
      month: "january",
      monthTag: "cool-season",
      displayImg:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      heroImg:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      highlight: {
        title: "Cool and Comfortable",
        brief: "Cooler temperatures make outdoor activities more enjoyable",
      },
    },
    {
      month: "february",
      monthTag: "dry-season",
      displayImg:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400",
      heroImg:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
      highlight: {
        title: "Dry Season",
        brief: "Excellent visibility for snorkeling and photography",
      },
    },
  ],
  booking: {
    pricing: {
      adult: 189,
      child: 95,
      infant: 0,
    },
    extras: [
      {
        name: "Professional photography package",
        price: 75,
        type: "per_booking",
      },
      {
        name: "Private guide upgrade",
        price: 150,
        type: "per_booking",
      },
      {
        name: "Spa treatment add-on",
        price: 80,
        type: "per_person",
      },
    ],
  },
};

export default {
  tour: tour,
};
