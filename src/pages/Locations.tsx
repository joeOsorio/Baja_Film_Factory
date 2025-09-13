import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import LocationCard from "@/components/LocationCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popularity");

  // Sample location data
  const allLocations = [
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
    {
      id: "4",
      name: "Mercado Hidalgo",
      description: "Mercado tradicional con colores vibrantes y ambiente auténtico mexicano.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      tags: ["Cultural", "Interior", "Comercial"],
      rating: 4.3,
      mapUrl: "https://maps.google.com/?q=Mercado+Hidalgo+Tijuana",
      parkingUrl: "https://maps.google.com/?q=parking+Mercado+Hidalgo",
      restroomUrl: "https://maps.google.com/?q=restrooms+Mercado+Hidalgo",
      hours: "7:00 AM - 8:00 PM",
    },
    {
      id: "5",
      name: "Cerro Colorado",
      description: "Elevación natural con vistas panorámicas de la ciudad y el valle.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["Natural", "Exterior", "Panorámico"],
      rating: 4.6,
      mapUrl: "https://maps.google.com/?q=Cerro+Colorado+Tijuana",
      hours: "Amanecer - Atardecer",
    },
    {
      id: "6",
      name: "Hotel Caesar",
      description: "Hotel histórico con arquitectura clásica y elegantes interiores art deco.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      tags: ["Histórico", "Interior", "Arquitectónico"],
      rating: 4.4,
      mapUrl: "https://maps.google.com/?q=Hotel+Caesar+Tijuana",
      parkingUrl: "https://maps.google.com/?q=parking+Hotel+Caesar",
      restroomUrl: "Available on site",
      hours: "24 horas",
    },
  ];

  const filteredLocations = allLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           location.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    switch (selectedSort) {
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      case "popularity":
      default:
        return b.rating - a.rating; // Default to rating for now
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Locaciones de Filmación</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra completa colección de locaciones en Tijuana, cada una con información detallada y enlaces directos a Google Maps.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Buscar por nombre, descripción o etiquetas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="urbano">Urbano</SelectItem>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="arquitectónico">Arquitectónico</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="histórico">Histórico</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularidad</SelectItem>
                  <SelectItem value="rating">Calificación</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Counter */}
            <div className="text-center text-muted-foreground mb-8">
              Mostrando {sortedLocations.length} de {allLocations.length} locaciones
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedLocations.map((location) => (
                <LocationCard key={location.id} {...location} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron locaciones</h3>
              <p className="text-muted-foreground mb-6">
                Intenta con diferentes términos de búsqueda o filtros
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Load More / Pagination could go here */}
      {sortedLocations.length > 0 && (
        <section className="py-8 text-center">
          <Button variant="outline" size="lg">
            Cargar más locaciones
          </Button>
        </section>
      )}
    </div>
  );
};

export default Locations;