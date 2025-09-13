import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import LocationCard from "@/components/LocationCard";
import { Search, MapPin, Users, FileText, Star, Camera, Globe, Shield } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [query, setQuery] = useState("");
  // Location images for carousel
  const locationImages = [
    { src: "/img/location/Centroculturaltijuana.jpeg", alt: "Centro Cultural Tijuana" },
    { src: "/img/location/ave-revolucion-2.jpg", alt: "Avenida Revolución" },
    { src: "/img/location/Playas_de_Tijuana.jpg", alt: "Playas de Tijuana" },
    { src: "/img/location/presa1.jpg", alt: "La Presa" },
    { src: "/img/location/Parque-Morelos-.jpg", alt: "Parque Morelos" },
    { src: "/img/location/img-campogolf-hero.jpg", alt: "Campo de Golf" },
    { src: "/img/location/zonkeys.jpg", alt: "Arena Zonkeys" },
    { src: "/img/location/baja-malibu.jpg", alt: "Baja Malibu" },
    { src: "/img/location/Lazaro.jpg", alt: "Preparatoria Lázaro Cárdenas" },
    { src: "/img/location/new-city-medical-plaza-craft-arquitectos-1-sl.jpg", alt: "New City Plaza" },
  ];

  // Sample location data
  const featuredLocations = [
    {
      id: "1",
      name: "Centro Cultural Tijuana",
      description: "Icónico centro cultural con arquitectura moderna y espacios versátiles para producciones.",
      image: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=400&h=300&fit=crop",
      tags: ["Arquitectónico", "Cultural", "Interior"],
      rating: 4.8,
      mapUrl: "https://maps.google.com/?q=Centro+Cultural+Tijuana",
      parkingUrl: "https://maps.google.com/?q=parking+near+Centro+Cultural+Tijuana",
      hours: "9:00 AM - 6:00 PM",
    },
    {
      id: "2", 
      name: "Avenida Revolución",
      description: "Emblemática avenida con ambiente urbano vibrante, perfecta para escenas callejeras.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      tags: ["Urbano", "Comercial", "Exterior"],
      rating: 4.5,
      mapUrl: "https://maps.google.com/?q=Avenida+Revolución+Tijuana",
      parkingUrl: "https://maps.google.com/?q=parking+Avenida+Revolución",
      restroomUrl: "https://maps.google.com/?q=public+restrooms+Avenida+Revolución",
      hours: "24 horas",
    },
    {
      id: "3",
      name: "Playas de Tijuana",
      description: "Costas pintorescas con vistas al Pacífico, ideales para producciones naturales.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      tags: ["Natural", "Playa", "Exterior"],
      rating: 4.7,
      mapUrl: "https://maps.google.com/?q=Playas+de+Tijuana",
      parkingUrl: "https://maps.google.com/?q=parking+Playas+de+Tijuana",
      hours: "Amanecer - Atardecer",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {locationImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative w-full h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float">
            <Camera className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Baja Film Factory
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Descubre las mejores locaciones de filmación en Tijuana. Tu directorio completo para producciones cinematográficas.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar locaciones..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 bg-background/90 backdrop-blur-sm border-primary-light/30"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/locations">
              <Button variant="hero" size="xl">
                <MapPin className="w-5 h-5" />
                Explorar Locaciones
              </Button>
            </Link>
            <Link to="/guide">
              <Button variant="cinema" size="xl">
                <FileText className="w-5 h-5" />
                Guía de Producción
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Locaciones</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">25+</div>
              <div className="text-sm text-muted-foreground">Proveedores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Producciones</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-6 h-6 fill-secondary text-secondary" />
                <span className="text-3xl font-bold text-secondary">4.8</span>
              </div>
              <div className="text-sm text-muted-foreground">Calificación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Images Carousel */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Locaciones Destacadas</h2>
            <p className="text-muted-foreground">
              Descubre los espacios más cinematográficos de Tijuana
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {locationImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Locaciones Destacadas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre las locaciones más populares y versátiles de Tijuana para tu próxima producción
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLocations
              .filter((l) =>
                !query ||
                l.name.toLowerCase().includes(query.toLowerCase()) ||
                l.description.toLowerCase().includes(query.toLowerCase()) ||
                l.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
              )
              .map((location) => (
                <LocationCard key={location.id} {...location} />
              ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/locations">
              <Button variant="outline" size="lg">
                Ver Todas las Locaciones
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Servicios Completos</h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas para tu producción en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <MapPin className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Locaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Directorio completo con mapas, horarios y servicios
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-secondary mb-4" />
                <CardTitle>Proveedores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Equipo, talento y servicios técnicos locales
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <FileText className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Guía Legal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Permisos, contactos gubernamentales y regulaciones
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto text-secondary mb-4" />
                <CardTitle>Soporte Internacional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Asistencia en inglés y español para producciones
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para tu próxima producción?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a más de 100 producciones que han confiado en Baja Film Factory
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl">
              <Camera className="w-5 h-5" />
              Comenzar Ahora
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Shield className="w-5 h-5" />
              Contactar Soporte
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/img/logos/factory.ico" alt="Baja Film Factory" className="w-8 h-8" />
                <span className="text-lg font-bold">Baja Film Factory</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu directorio completo para producciones cinematográficas en Tijuana.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Servicios</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Locaciones</li>
                <li>Proveedores</li>
                <li>Permisos</li>
                <li>Soporte</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Recursos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Guía de Producción</li>
                <li>Contactos</li>
                <li>Regulaciones</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contacto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>info@bajafilmfactory.com</li>
                <li>+52 664 XXX XXXX</li>
                <li>Tijuana, Baja California</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Baja Film Factory. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
