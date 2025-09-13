import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Star, Camera, Lightbulb, Mic, Utensils, Car, Users } from "lucide-react";

const Providers = () => {
  const providerCategories = [
    {
      id: "equipment",
      title: "Equipo y Tecnología",
      icon: Camera,
      color: "text-primary",
      providers: [
        {
          name: "Cine Tech Tijuana",
          category: "Equipos de Cámara",
          rating: 4.8,
          phone: "+52 664 123 4567",
          email: "info@cinetech.mx",
          location: "Zona Centro",
          specialties: ["RED", "ARRI", "Drones", "Steadicam"],
          description: "Renta completa de equipos cinematográficos profesionales."
        },
        {
          name: "Luz y Sonido Pro",
          category: "Iluminación y Audio",
          rating: 4.6,
          phone: "+52 664 234 5678",
          email: "contacto@luzpro.mx",
          location: "Zona Río",
          specialties: ["LED", "HMI", "Audio", "Wireless"],
          description: "Especialistas en iluminación profesional y equipos de audio."
        }
      ]
    },
    {
      id: "production",
      title: "Casas Productoras",
      icon: Users,
      color: "text-secondary",
      providers: [
        {
          name: "Border Films",
          category: "Producción Completa",
          rating: 4.9,
          phone: "+52 664 345 6789",
          email: "hello@borderfilms.mx",
          location: "Chapultepec",
          specialties: ["Ficción", "Documental", "Comercial", "Bilingüe"],
          description: "Casa productora especializada en producciones fronterizas."
        }
      ]
    },
    {
      id: "talent",
      title: "Talento y Casting",
      icon: Users,
      color: "text-primary",
      providers: [
        {
          name: "Casting Frontera",
          category: "Agencia de Talento",
          rating: 4.7,
          phone: "+52 664 456 7890",
          email: "casting@frontera.mx",
          location: "Zona Centro",
          specialties: ["Actores", "Extras", "Modelos", "Voces"],
          description: "Base de datos completa de talento local e internacional."
        }
      ]
    },
    {
      id: "logistics",
      title: "Logística y Servicios",
      icon: Car,
      color: "text-secondary",
      providers: [
        {
          name: "TJ Logistics Film",
          category: "Transporte y Hospedaje",
          rating: 4.5,
          phone: "+52 664 567 8901",
          email: "logistics@tjfilm.mx",
          location: "Aeropuerto",
          specialties: ["Vehículos", "Hospedaje", "Permisos", "Seguridad"],
          description: "Servicios integrales de logística para producciones."
        },
        {
          name: "Catering Cine MX",
          category: "Alimentación",
          rating: 4.4,
          phone: "+52 664 678 9012",
          email: "info@cateringcine.mx",
          location: "Toda la ciudad",
          specialties: ["Craft Services", "Comida Corrida", "Snacks", "Bebidas"],
          description: "Servicios de alimentación especializados en sets."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Directorio de Proveedores</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conecta con los mejores profesionales y empresas de la industria cinematográfica en Tijuana.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {providerCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="flex items-center mb-8">
                <category.icon className={`w-8 h-8 ${category.color} mr-3`} />
                <h2 className="text-3xl font-bold">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.providers.map((provider, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">{provider.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {provider.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {provider.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Specialties */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Especialidades:</h4>
                        <div className="flex flex-wrap gap-1">
                          {provider.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{provider.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{provider.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">{provider.location}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(`tel:${provider.phone}`)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Llamar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(`mailto:${provider.email}`)}
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Eres proveedor de servicios cinematográficos?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a nuestro directorio y conecta con producciones locales e internacionales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Users className="w-5 h-5" />
              Registrar mi Empresa
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="w-5 h-5" />
              Contactar Equipo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Providers;