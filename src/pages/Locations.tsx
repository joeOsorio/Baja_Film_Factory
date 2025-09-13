import { useState, useEffect, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import LocationCard from "@/components/LocationCard";
import { Search, Filter, SlidersHorizontal, AlertCircle } from "lucide-react";
import Map from "@/components/Map";
import { supabase } from "@/integrations/supabase/client";

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

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch locations from database
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .order('name');

        if (error) throw error;
        setLocations(data || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Error al cargar las locaciones. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Remote search against Supabase when the debounced term changes
  useEffect(() => {
    const run = async () => {
      setSearching(true);
      setError(null);
      try {
        let query = supabase.from('locations').select('*').order('name');
        if (debouncedSearchTerm.trim()) {
          const term = `%${debouncedSearchTerm.trim()}%`;
          query = query.or(`name.ilike.${term},description.ilike.${term},address.ilike.${term}`);
        }
        const { data, error } = await query;
        if (error) throw error;
        setLocations(data || []);
      } catch (e) {
        console.error('Error searching locations:', e);
        setError('No se pudieron cargar resultados. Intenta nuevamente.');
      } finally {
        setSearching(false);
      }
    };

    run();
  }, [debouncedSearchTerm]);

  // Handle search with debouncing
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Memoized filtered locations for better performance
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch = debouncedSearchTerm === "" || 
                           location.name.toLowerCase().includes(searchLower) ||
                           location.description?.toLowerCase().includes(searchLower) ||
                           location.address?.toLowerCase().includes(searchLower) ||
                           location.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesCategory = selectedCategory === "all" || 
                             location.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
      
      return matchesSearch && matchesCategory;
    });
  }, [locations, debouncedSearchTerm, selectedCategory]);

  // Memoized sorted locations
  const sortedLocations = useMemo(() => {
    return [...filteredLocations].sort((a, b) => {
      switch (selectedSort) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "popularity":
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });
  }, [filteredLocations, selectedSort]);

  const suggestions = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    if (s.length < 2) return [] as string[];
    const seen = new Set<string>();
    return locations
      .filter(l => l.name.toLowerCase().includes(s))
      .slice(0, 5)
      .map(l => l.name)
      .filter(name => {
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });
  }, [searchTerm, locations]);

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
                  placeholder="Buscar por nombre, descripción, dirección o etiquetas..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 h-12"
                />
                {searching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  </div>
                )}
                {suggestions.length > 0 && (
                  <div className="absolute z-10 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow">
                    <ul className="py-2">
                      {suggestions.map((sug) => (
                        <li key={sug}>
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
                            onClick={() => {
                              handleSearch(sug);
                              setDebouncedSearchTerm(sug);
                            }}
                          >
                            {sug}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

            {/* Search Results Info */}
            <div className="text-center text-muted-foreground mb-8">
              {debouncedSearchTerm ? (
                <span>
                  Mostrando {sortedLocations.length} resultado{sortedLocations.length !== 1 ? 's' : ''} 
                  {sortedLocations.length > 0 ? ` para "${debouncedSearchTerm}"` : ` - No se encontraron locaciones para "${debouncedSearchTerm}"`}
                </span>
              ) : (
                <span>Mostrando {sortedLocations.length} de {locations.length} locaciones</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error State */}
          {error && (
            <Alert className="mb-8 max-w-4xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-lg">Cargando locaciones...</p>
              </div>
            </div>
          ) : sortedLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedLocations.map((location) => (
                <LocationCard 
                  key={location.id}
                  id={location.slug}
                  name={location.name}
                  description={location.description}
                  image={location.hero_image_url}
                  tags={location.tags}
                  rating={location.rating}
                  mapUrl={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                />
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
                  setDebouncedSearchTerm("");
                  setSelectedCategory("all");
                  setError(null);
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