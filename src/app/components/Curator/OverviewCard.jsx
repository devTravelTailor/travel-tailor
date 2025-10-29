"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui/card";
import { Calendar, IndianRupee, Users, User } from "lucide-react";

export default function OverviewCard({
  duration = "12 Days",
  price = "5,850",
  suggestedAges = "Any",
  maxGroupSize = "Any",
}) {
  const overviewItems = [
    {
      icon: Calendar,
      label: "Duration",
      value: duration,
    },
    {
      icon: IndianRupee,
      label: "Price per person",
      value: price,
    },
    {
      icon: User,
      label: "Suggested Ages",
      value: suggestedAges,
    },
    {
      icon: Users,
      label: "Maximum Group Size",
      value: maxGroupSize,
    },
  ];
  return (
    <Card className="w-full gap-2 p-0 py-4 h-fit mb-4 max-w-4xl border-border shadow-md bg-card">
      <CardHeader>
        <CardTitle className="text-2xl py-0 font-semibold text-foreground">
          Tour Overview
        </CardTitle>
      </CardHeader>
      <CardContent className={"p-0 px-6"}>
        <div className="grid grid-cols-1 py-2 sm:grid-cols-2 gap-2">
          {overviewItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-orange-500/10">
                <item.icon className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {item.label}:
                </p>
                <p className="text-base font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
