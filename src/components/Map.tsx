import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  heightClass?: string;
}

const Map: React.FC<MapProps> = ({ heightClass = 'h-72' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Try to get token from a global or localStorage (temporary dev aid)
    const token = (window as any).MAPBOX_PUBLIC_TOKEN || localStorage.getItem('mapbox_token') || '';
    mapboxgl.accessToken = token;

    if (!mapboxgl.accessToken) {
      return; // Render fallback UI below
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-117.0382, 32.5149], // Tijuana approx
      zoom: 10,
      pitch: 45,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const hasToken = Boolean((window as any).MAPBOX_PUBLIC_TOKEN || localStorage.getItem('mapbox_token'));

  return (
    <div className={`relative w-full ${heightClass}`}>
      {hasToken ? (
        <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      ) : (
        <div className="absolute inset-0 rounded-lg border border-dashed border-border flex items-center justify-center text-center p-6 text-sm text-muted-foreground bg-muted/40">
          <div>
            <p className="font-medium mb-1">Mapa deshabilitado</p>
            <p>Agrega tu Mapbox public token en Supabase Edge Function Secrets y recarga.</p>
            <p className="mt-2 opacity-80">Temporalmente, puedes guardar tu token en localStorage como “mapbox_token”.</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;
