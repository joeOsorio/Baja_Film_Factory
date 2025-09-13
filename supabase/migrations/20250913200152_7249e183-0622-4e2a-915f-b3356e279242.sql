-- Insert the new locations into the database
INSERT INTO public.locations (name, description, address, tags, rating, hero_image_url, latitude, longitude) VALUES
('Casa de la Cultura Altamira', 'Un centro cultural vibrante que ofrece espacios versátiles para producciones cinematográficas. Cuenta con auditorios, salas de exposición y áreas abiertas perfectas para escenas que requieran un ambiente artístico o educativo. Arquitectura moderna con amplios ventanales que permiten excelente iluminación natural.', 'Altamira, Tijuana, Baja California', ARRAY['Cultural', 'Arquitectónico', 'Interior', 'Educativo'], 4.6, '/img/location/Centroculturaltijuana.jpeg', 32.5027, -117.0143),

('Centro Cultural Tijuana (CECUT)', 'Icono arquitectónico de Tijuana, conocido como "La Bola". Ofrece impresionantes espacios museísticos, jardines botánicos y el famoso Omnimax. Ideal para escenas que requieran arquitectura distintiva, ambientes culturales o fondos futuristas. Espacios interiores y exteriores de gran escala.', 'Paseo de los Héroes 9350, Zona Urbana Río, Tijuana, B.C.', ARRAY['Arquitectónico', 'Cultural', 'Futurista', 'Exterior', 'Interior'], 4.8, '/img/location/Centroculturaltijuana.jpeg', 32.5149, -117.0382),

('Arena Zonkeys', 'Moderno estadio deportivo sede del equipo de baloncesto Zonkeys. Perfecto para escenas deportivas, conciertos o eventos masivos. Cuenta con iluminación profesional, gradas con capacidad para miles de espectadores y áreas de vestidores. Ideal para capturar la energía de eventos deportivos.', 'Boulevard Agua Caliente, Tijuana, B.C.', ARRAY['Deportivo', 'Moderno', 'Interior', 'Eventos'], 4.5, '/img/location/zonkeys.jpg', 32.5321, -117.0132),

('La Presa', 'Ubicación natural con el embalse Abelardo L. Rodríguez como protagonista. Ofrece paisajes acuáticos, áreas verdes extensas y miradores panorámicos. Perfecta para escenas al aire libre, tomas aéreas, actividades acuáticas o secuencias que requieran entornos naturales dentro de la ciudad.', 'Presa Abelardo L. Rodríguez, Tijuana, B.C.', ARRAY['Natural', 'Acuático', 'Exterior', 'Panorámico'], 4.7, '/img/location/presa1.jpg', 32.4890, -116.9625),

('Campo de Golf', 'Exclusivo club campestre con campos de golf impecablemente mantenidos, áreas sociales elegantes y paisajes cuidadosamente diseñados. Ideal para escenas de alto nivel social, eventos empresariales o momentos que requieran entornos sofisticados y paisajísticos.', 'Club Campestre, Tijuana, B.C.', ARRAY['Elegante', 'Deportivo', 'Exterior', 'Empresarial'], 4.4, '/img/location/img-campogolf-hero.jpg', 32.5234, -117.0876),

('Baja Malibu', 'Desarrollo costero de lujo en Real del Mar con acceso playero privado. Ofrece vistas espectaculares al océano Pacífico, campos de golf y arquitectura mediterránea. Perfecto para escenas vacacionales, dramas familiares o cualquier producción que requiera elegancia costera.', 'Real del Mar, Tijuana, B.C.', ARRAY['Costero', 'Lujo', 'Exterior', 'Mediterráneo'], 4.9, '/img/location/baja-malibu.jpg', 32.4456, -117.1543),

('New City Plaza', 'Moderno centro comercial y complejo empresarial con arquitectura contemporánea. Espacios amplios, tiendas elegantes y áreas comunes ideales para escenas urbanas, comerciales o secuencias que capturen la vida moderna en la ciudad.', 'New City Medical Plaza, Tijuana, B.C.', ARRAY['Moderno', 'Comercial', 'Interior', 'Empresarial'], 4.3, '/img/location/new-city-medical-plaza-craft-arquitectos-1-sl.jpg', 32.5543, -117.0234),

('Preparatoria Lázaro Cárdenas', 'Institución educativa con amplios salones, laboratorios, canchas deportivas y auditorio. Perfecta para escenas escolares, coming-of-age stories o cualquier producción que requiera ambientes educativos auténticos. Arquitectura institucional funcional.', 'Colonia Lázaro Cárdenas, Tijuana, B.C.', ARRAY['Educativo', 'Interior', 'Deportivo', 'Institucional'], 4.2, '/img/location/Lazaro.jpg', 32.4712, -117.0098),

('Avenida Revolución', 'El corazón histórico y turístico de Tijuana. Famosa por sus bares, tiendas de souvenirs y ambiente vibrante. Ideal para escenas callejeras, turísticas o que capturen la esencia fronteriza. Arquitectura tradicional mezclada con modernidad.', 'Avenida Revolución, Centro, Tijuana, B.C.', ARRAY['Histórico', 'Turístico', 'Comercial', 'Exterior'], 4.5, '/img/location/ave-revolucion-2.jpg', 32.5149, -117.0382),

('Parque Morelos', 'Extenso parque urbano con lagos artificiales, áreas de picnic, zoológico y jardines botánicos. Ofrece diversidad de escenarios naturales dentro de la ciudad, perfecto para días de campo, encuentros al aire libre o secuencias familiares.', 'Blvd. Insurgentes, Tijuana, B.C.', ARRAY['Natural', 'Familiar', 'Exterior', 'Recreativo'], 4.6, '/img/location/Parque-Morelos-.jpg', 32.5234, -117.0543),

('Hotel Caesars', 'Hotel histórico famoso por ser el lugar de nacimiento de la Caesar Salad. Combina elegancia vintage con modernidad. Ideal para escenas hoteleras, restaurantes elegantes o momentos que requieran ambientes con historia y carácter.', 'Avenida Revolución 827, Centro, Tijuana, B.C.', ARRAY['Histórico', 'Elegante', 'Interior', 'Gastronómico'], 4.4, '/img/location/caesars.jpg', 32.5149, -117.0382),

('Playas de Tijuana', 'Paseo marítimo con el icónico muro fronterizo como fondo dramático. Ofrece playas, malecón, monumentos y vistas al océano. Perfecto para escenas costeras, dramas fronterizos o secuencias al atardecer.', 'Playas de Tijuana, Tijuana, B.C.', ARRAY['Costero', 'Fronterizo', 'Exterior', 'Dramático'], 4.7, '/img/location/Playas_de_Tijuana.jpg', 32.4456, -117.1234),

('Cerro Colorado', 'Área natural elevada con miradores panorámicos de la ciudad. Incluye parques, áreas de skate y biblioteca pública. Ideal para tomas aéreas, escenas de contemplación o momentos que requieran perspectivas urbanas elevadas.', 'Cerro Colorado, Tijuana, B.C.', ARRAY['Natural', 'Panorámico', 'Exterior', 'Urbano'], 4.6, '/img/location/cerro_colorado.jpg', 32.5432, -117.0234),

('Mercado Hidalgo', 'Auténtico mercado mexicano con colores, sabores y aromas característicos. Puestos de artesanías, comida tradicional y ambiente vibrante. Perfecto para escenas culturales, encuentros casuales o capturar la esencia de la vida mercantil local.', 'Avenida Independencia, Centro, Tijuana, B.C.', ARRAY['Cultural', 'Tradicional', 'Interior', 'Comercial'], 4.3, '/img/location/mercado_hidalgo.jpg', 32.5234, -117.0432);

-- Insert location hours for each location
INSERT INTO public.location_hours (location_id, days, open_time, close_time, note) 
SELECT 
    l.id,
    'Lunes a Viernes',
    '09:00',
    '18:00',
    'Horarios pueden variar por eventos especiales'
FROM public.locations l 
WHERE l.name IN ('Casa de la Cultura Altamira', 'Centro Cultural Tijuana (CECUT)', 'New City Plaza', 'Preparatoria Lázaro Cárdenas', 'Hotel Caesars', 'Mercado Hidalgo');

INSERT INTO public.location_hours (location_id, days, open_time, close_time, is_24_7, note) 
SELECT 
    l.id,
    'Todos los días',
    NULL,
    NULL,
    true,
    'Acceso libre las 24 horas'
FROM public.locations l 
WHERE l.name IN ('Avenida Revolución', 'Playas de Tijuana', 'La Presa', 'Parque Morelos', 'Cerro Colorado');

INSERT INTO public.location_hours (location_id, days, open_time, close_time, note) 
SELECT 
    l.id,
    'Lunes a Domingo',
    '06:00',
    '22:00',
    'Horarios pueden variar según temporada'
FROM public.locations l 
WHERE l.name IN ('Campo de Golf', 'Baja Malibu');

INSERT INTO public.location_hours (location_id, days, open_time, close_time, note) 
SELECT 
    l.id,
    'Según eventos',
    '19:00',
    '23:00',
    'Consultar calendario de eventos'
FROM public.locations l 
WHERE l.name = 'Arena Zonkeys';

-- Insert Google Maps links for each location
INSERT INTO public.location_links (location_id, type, url, label)
SELECT 
    l.id,
    'maps',
    'https://maps.google.com/?q=' || replace(l.name, ' ', '+') || '+Tijuana',
    'Ver en Google Maps'
FROM public.locations l;

-- Insert parking information links where applicable
INSERT INTO public.location_links (location_id, type, url, label)
SELECT 
    l.id,
    'parking',
    'https://maps.google.com/?q=parking+near+' || replace(l.name, ' ', '+') || '+Tijuana',
    'Estacionamiento cercano'
FROM public.locations l 
WHERE l.name IN ('Centro Cultural Tijuana (CECUT)', 'Arena Zonkeys', 'Hotel Caesars', 'New City Plaza', 'Campo de Golf', 'Baja Malibu');