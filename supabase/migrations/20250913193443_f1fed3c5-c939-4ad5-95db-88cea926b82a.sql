-- Insert new locations into the database
INSERT INTO locations (name, description, slug, tags, rating, address, hero_image_url) VALUES
('Casa de la Cultura Altamira', 'Un centro cultural vibrante que ofrece espacios versátiles para producciones cinematográficas. Cuenta con auditorios, salas de exposición y áreas abiertas perfectas para escenas que requieran un ambiente artístico o educativo. Arquitectura moderna con amplios ventanales que permiten excelente iluminación natural.', 'casa-cultura-altamira', ARRAY['cultura', 'auditorio', 'educativo', 'moderno'], 4.5, 'Altamira, Tijuana, B.C.', '/img/location/Centroculturaltijuana.jpeg'),

('Centro Cultural Tijuana (CECUT)', 'Icono arquitectónico de Tijuana, conocido como "La Bola". Ofrece impresionantes espacios museísticos, jardines botánicos y el famoso Omnimax. Ideal para escenas que requieran arquitectura distintiva, ambientes culturales o fondos futuristas. Espacios interiores y exteriores de gran escala.', 'centro-cultural-tijuana', ARRAY['cultura', 'museo', 'arquitectura', 'futurista'], 4.8, 'Zona Río, Tijuana, B.C.', '/img/location/Centroculturaltijuana.jpeg'),

('Arena Zonkeys', 'Moderno estadio deportivo sede del equipo de baloncesto Zonkeys. Perfecto para escenas deportivas, conciertos o eventos masivos. Cuenta con iluminación profesional, gradas con capacidad para miles de espectadores y áreas de vestidores. Ideal para capturar la energía de eventos deportivos.', 'arena-zonkeys', ARRAY['deportes', 'eventos', 'conciertos', 'masivo'], 4.6, 'Tijuana, B.C.', '/img/location/zonkeys.jpg'),

('La Presa', 'Ubicación natural con el embalse Abelardo L. Rodríguez como protagonista. Ofrece paisajes acuáticos, áreas verdes extensas y miradores panorámicos. Perfecta para escenas al aire libre, tomas aéreas, actividades acuáticas o secuencias que requieran entornos naturales dentro de la ciudad.', 'la-presa', ARRAY['natural', 'agua', 'paisaje', 'aire libre'], 4.4, 'Tijuana, B.C.', '/img/location/presa1.jpg'),

('Campo de Golf', 'Exclusivo club campestre con campos de golf impecablemente mantenidos, áreas sociales elegantes y paisajes cuidadosamente diseñados. Ideal para escenas de alto nivel social, eventos empresariales o momentos que requieran entornos sofisticados y paisajísticos.', 'campo-golf', ARRAY['golf', 'exclusivo', 'elegante', 'empresarial'], 4.7, 'Tijuana, B.C.', '/img/location/img-campogolf-hero.jpg'),

('Baja Malibu', 'Desarrollo costero de lujo en Real del Mar con acceso playero privado. Ofrece vistas espectaculares al océano Pacífico, campos de golf y arquitectura mediterránea. Perfecto para escenas vacacionales, dramas familiares o cualquier producción que requiera elegancia costera.', 'baja-malibu', ARRAY['costero', 'lujo', 'playa', 'mediterráneo'], 4.8, 'Real del Mar, Tijuana, B.C.', '/img/location/baja-malibu.jpg'),

('New City Plaza', 'Moderno centro comercial y complejo empresarial con arquitectura contemporánea. Espacios amplios, tiendas elegantes y áreas comunes ideales para escenas urbanas, comerciales o secuencias que capturen la vida moderna en la ciudad.', 'new-city-plaza', ARRAY['comercial', 'moderno', 'urbano', 'empresarial'], 4.3, 'Tijuana, B.C.', '/img/location/new-city-medical-plaza-craft-arquitectos-1-sl.jpg'),

('Preparatoria Lázaro Cárdenas', 'Institución educativa con amplios salones, laboratorios, canchas deportivas y auditorio. Perfecta para escenas escolares, coming-of-age stories o cualquier producción que requiera ambientes educativos auténticos. Arquitectura institucional funcional.', 'preparatoria-lazaro-cardenas', ARRAY['educativo', 'escolar', 'institucional', 'deportes'], 4.2, 'Tijuana, B.C.', '/img/location/Lazaro.jpg'),

('Avenida Revolución', 'El corazón histórico y turístico de Tijuana. Famosa por sus bares, tiendas de souvenirs y ambiente vibrante. Ideal para escenas callejeras, turísticas o que capturen la esencia fronteriza. Arquitectura tradicional mezclada con modernidad.', 'avenida-revolucion', ARRAY['histórico', 'turístico', 'fronterizo', 'vibrante'], 4.5, 'Centro, Tijuana, B.C.', '/img/location/ave-revolucion-2.jpg'),

('Parque Morelos', 'Extenso parque urbano con lagos artificiales, áreas de picnic, zoológico y jardines botánicos. Ofrece diversidad de escenarios naturales dentro de la ciudad, perfecto para días de campo, encuentros al aire libre o secuencias familiares.', 'parque-morelos', ARRAY['parque', 'natural', 'familia', 'zoológico'], 4.4, 'Tijuana, B.C.', '/img/location/Parque-Morelos-.jpg'),

('Hotel Caesars', 'Hotel histórico famoso por ser el lugar de nacimiento de la Caesar Salad. Combina elegancia vintage con modernidad. Ideal para escenas hoteleras, restaurantes elegantes o momentos que requieran ambientes con historia y carácter.', 'hotel-caesars', ARRAY['histórico', 'hotel', 'elegante', 'vintage'], 4.6, 'Avenida Revolución, Tijuana, B.C.', '/img/location/caesars.jpg'),

('Playas de Tijuana', 'Paseo marítimo con el icónico muro fronterizo como fondo dramático. Ofrece playas, malecón, monumentos y vistas al océano. Perfecto para escenas costeras, dramas fronterizos o secuencias al atardecer.', 'playas-tijuana', ARRAY['playa', 'fronterizo', 'marítimo', 'dramático'], 4.5, 'Playas de Tijuana, B.C.', '/img/location/Playas_de_Tijuana.jpg'),

('Cerro Colorado', 'Área natural elevada con miradores panorámicos de la ciudad. Incluye parques, áreas de skate y biblioteca pública. Ideal para tomas aéreas, escenas de contemplación o momentos que requieran perspectivas urbanas elevadas.', 'cerro-colorado', ARRAY['mirador', 'panorámico', 'skate', 'biblioteca'], 4.3, 'Tijuana, B.C.', '/img/location/cerro_colorado.jpg'),

('Mercado Hidalgo', 'Auténtico mercado mexicano con colores, sabores y aromas característicos. Puestos de artesanías, comida tradicional y ambiente vibrante. Perfecto para escenas culturales, encuentros casuales o capturar la esencia de la vida mercantil local.', 'mercado-hidalgo', ARRAY['mercado', 'tradicional', 'cultural', 'gastronómico'], 4.4, 'Centro, Tijuana, B.C.', '/img/location/mercado_hidalgo.jpg')

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags,
  rating = EXCLUDED.rating,
  address = EXCLUDED.address,
  hero_image_url = EXCLUDED.hero_image_url,
  updated_at = now();