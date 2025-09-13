import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Clock, Car, WashingMachine } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  tags: string[];
  rating: number;
  hero_image_url: string;
  slug: string;
}

const LocationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setLocation(data);
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Localización no encontrada</h1>
            <Button onClick={() => navigate('/locations')}>
              Volver a Localizaciones
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/locations')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Localizaciones
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative">
            <img
              src={location.hero_image_url}
              alt={location.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="font-medium">{location.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-4">
                {location.name}
              </h1>
              
              <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>{location.address}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {location.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {location.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="justify-start space-x-2"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, '_blank')}
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>Ver en Mapa</span>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start space-x-2"
              >
                <Clock className="w-4 h-4 text-primary" />
                <span>Horarios</span>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start space-x-2"
              >
                <Car className="w-4 h-4 text-secondary" />
                <span>Parking</span>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start space-x-2"
              >
                <WashingMachine className="w-4 h-4 text-accent-foreground" />
                <span>Servicios</span>
              </Button>
            </div>

            <div className="pt-4">
              <Button className="w-full" variant="hero" size="lg">
                Solicitar Cotización
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;