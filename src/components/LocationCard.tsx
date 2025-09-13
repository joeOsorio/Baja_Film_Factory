import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Car, WashingMachine, Star } from "lucide-react";

interface LocationCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  mapUrl?: string;
  parkingUrl?: string;
  restroomUrl?: string;
  hours?: string;
}

const LocationCard = ({
  name,
  description,
  image,
  tags,
  rating,
  mapUrl,
  parkingUrl,
  restroomUrl,
  hours,
}: LocationCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 fill-secondary text-secondary" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Quick Info Icons */}
        <div className="grid grid-cols-2 gap-2">
          {mapUrl && (
            <Button
              variant="outline"
              size="sm"
              className="justify-start space-x-2"
              onClick={() => window.open(mapUrl, '_blank')}
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs">Lugar</span>
            </Button>
          )}
          
          {hours && (
            <Button
              variant="outline"
              size="sm"
              className="justify-start space-x-2"
            >
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs">{hours}</span>
            </Button>
          )}
          
          {parkingUrl && (
            <Button
              variant="outline"
              size="sm"
              className="justify-start space-x-2"
              onClick={() => window.open(parkingUrl, '_blank')}
            >
              <Car className="w-4 h-4 text-secondary" />
              <span className="text-xs">Parking</span>
            </Button>
          )}
          
          {restroomUrl && (
            <Button
              variant="outline"
              size="sm"
              className="justify-start space-x-2"
              onClick={() => window.open(restroomUrl, '_blank')}
            >
              <WashingMachine className="w-4 h-4 text-accent-foreground" />
              <span className="text-xs">Baños</span>
            </Button>
          )}
        </div>

        <Button className="w-full" variant="hero">
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationCard;