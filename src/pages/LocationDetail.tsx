import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Car, Phone, Mail, Star, Navigation as DirectionsIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

interface LocationData {
  id: string;
  name: string;
  description: string;
  address: string;
  tags: string[];
  rating: number;
  hero_image_url: string;
  latitude: number;
  longitude: number;
  location_hours: Array<{
    days: string;
    open_time: string;
    close_time: string;
    is_24_7: boolean;
    note: string;
  }>;
  location_links: Array<{
    type: string;
    url: string;
    label: string;
  }>;
  location_contacts: Array<{
    name: string;
    role: string;
    email: string;
    phone: string;
  }>;
}

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('locations')
          .select(`
            *,
            location_hours(*),
            location_links(*),
            location_contacts(*)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setLocation(data);
      } catch (error) {
        console.error('Error fetching location:', error);
        toast.error('Error al cargar la ubicación');
        navigate('/locations');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ubicación no encontrada</h2>
            <Button onClick={() => navigate('/locations')}>
              Volver a Ubicaciones
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const mapsLink = location.location_links.find(link => link.type === 'maps');
  const parkingLink = location.location_links.find(link => link.type === 'parking');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          <img
            src="/img/location/generic-location-bg.jpg"
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          <div className="absolute top-6 left-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/locations')}
              className="bg-background/80 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 fill-secondary text-secondary" />
              <span className="text-lg font-semibold text-foreground">{location.rating}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {location.name}
            </h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location.address}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {location.description}
                </p>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {location.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            {location.location_hours.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Horarios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {location.location_hours.map((hours, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{hours.days}</span>
                      <span className="text-muted-foreground">
                        {hours.is_24_7 ? '24 horas' : `${hours.open_time} - ${hours.close_time}`}
                      </span>
                    </div>
                  ))}
                  {location.location_hours[0]?.note && (
                    <>
                      <Separator />
                      <p className="text-sm text-muted-foreground">
                        {location.location_hours[0].note}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acceso Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mapsLink && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(mapsLink.url, '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver en Google Maps
                  </Button>
                )}
                
                {parkingLink && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(parkingLink.url, '_blank')}
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Estacionamiento
                  </Button>
                )}

                {location.latitude && location.longitude && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`, '_blank')}
                  >
                    <DirectionsIcon className="w-4 h-4 mr-2" />
                    Cómo llegar
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            {location.location_contacts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {location.location_contacts.map((contact, index) => (
                    <div key={index} className="space-y-2">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                      {contact.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                            {contact.email}
                          </a>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      {index < location.location_contacts.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="bg-gradient-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">¿Interesado en esta ubicación?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contacta con nosotros para más información sobre disponibilidad y tarifas.
                </p>
                <Button className="w-full" variant="hero">
                  Solicitar Información
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;