import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import LocationCard from "@/components/LocationCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import Map from "@/components/Map";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LocationData {
  id: string;
  name: string;
  description: string;
  hero_image_url: string;
  tags: string[];
  rating: number;
  location_links: Array<{
    type: string;
    url: string;
  }>;
  location_hours: Array<{
    days: string;
    open_time: string;
    close_time: string;
    is_24_7: boolean;
  }>;
}

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [allLocations, setAllLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('locations')
          .select(`
            *,
            location_links(*),
            location_hours(*)
          `);

        if (error) throw error;
        setAllLocations(data || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
        toast.error('Error al cargar las ubicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

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

          <div className="mt-8">
            <Map heightClass="h-80" />
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64"></div>
                </div>
              ))}
            </div>
          ) : sortedLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedLocations.map((location) => {
                const mapsLink = location.location_links.find(link => link.type === 'maps');
                const parkingLink = location.location_links.find(link => link.type === 'parking');
                const hours = location.location_hours[0];
                
                return (
                  <LocationCard 
                    key={location.id} 
                    id={location.id}
                    name={location.name}
                    description={location.description}
                    image={location.hero_image_url}
                    tags={location.tags}
                    rating={location.rating}
                    mapUrl={mapsLink?.url}
                    parkingUrl={parkingLink?.url}
                    hours={hours?.is_24_7 ? '24 horas' : hours ? `${hours.open_time} - ${hours.close_time}` : undefined}
                  />
                );
              })}
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