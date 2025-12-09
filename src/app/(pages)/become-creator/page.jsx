"use client";
import { useState } from "react";
import {
  Map,
  Users,
  Camera,
  DollarSign,
  Compass,
  ArrowRight,
} from "lucide-react";
import { CreatorApplicationDialog } from "../../components/BecomeCreator/CreatorApplicationDialog";
import { Button } from "../../components/ui/button";
import { AuthDialog } from "../../components/Auth/authDialog";

const benefits = [
  {
    icon: Map,
    title: "Curate Journeys",
    description:
      "Design your dream itineraries with help from our destination experts",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "Invite your followers and create private groups for your trips",
  },
  {
    icon: Compass,
    title: "Travel & Engage",
    description: "Enjoy traveling while engaging closely with your community",
  },
  {
    icon: Camera,
    title: "Create Content",
    description: "Create amazing content with your community when you travel",
  },
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Set your own rates and earn from every trip you lead",
  },
];

export default function BecomeCreatorPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialog, setAuthDialog] = useState(false);

  const handleDialog = () => {
    var token = localStorage.getItem("token");
    if (!token) {
      setAuthDialog(true);
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <div className="  bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Become a Smith Today
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Join our community of passionate travel creators and turn your
            wanderlust into a rewarding journey
          </p>
        </div>
      </section>

      {/* Who are Smiths Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl mb-4 md:text-4xl font-bold text-foreground">
              Who are Smiths?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Smiths are passionate experts in their field with a fervor for
              travel. They have an affable nature and a considerable social
              network, either online or offline. They are able to influence
              their community to travel with them on unique journeys.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              If this describes you and you would like to collaborate with us,
              please apply below. If your profile is a match, we will reach out
              to you.
            </p>
            <Button
              size="lg"
              className="mt-4 h-12 px-8 text-base font-semibold bg-orange-600/80"
              onClick={handleDialog}
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2232"
              alt="Travel community"
              className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
            />
            {/* <div className="absolute -bottom-6 -left-6 bg-orange-600/80 text-white p-6 rounded-xl shadow-lg hidden md:block">
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm opacity-90">Active Smiths</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Become a Smith?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlock incredible benefits and turn your passion for travel into a
              thriving career
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-orange-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition-colors">
                    <Icon className="w-7 h-7 text-orange-600/80" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-orange-600/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of travel creators who are already sharing their
            passion and earning from unforgettable experiences.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-10 text-base font-semibold"
            onClick={handleDialog}
          >
            Apply to be a Smith
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <AuthDialog
        open={authDialog}
        onOpenChange={setAuthDialog}
        onAuthSuccess={() => {
          const token = localStorage.getItem("token");
          if (token) {
            setDialogOpen(true);
          }
        }}
      />

      {/* Application Dialog */}
      <CreatorApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
