"use client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export function CreatorCard({ id, name, location, image, trips }) {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden cursor-pointer hover-scale transition-all duration-300 hover:shadow-lg"
      onClick={() => navigate(`/creators/${id}`)}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{location}</p>
          <Badge variant="secondary" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {trips} trips
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
