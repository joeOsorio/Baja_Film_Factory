-- Locations data model for Baja Film Factory
-- Utility function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Main locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  rating NUMERIC(2,1),
  tags TEXT[] DEFAULT '{}',
  hero_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON public.locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_tags ON public.locations USING GIN(tags);

CREATE TRIGGER trg_locations_updated_at
BEFORE UPDATE ON public.locations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'locations' AND policyname = 'Locations are readable by everyone'
  ) THEN
    CREATE POLICY "Locations are readable by everyone"
    ON public.locations FOR SELECT USING (true);
  END IF;
END $$;

-- Location links (map, parking, restroom, website, etc.)
CREATE TABLE IF NOT EXISTS public.location_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  label TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.location_links ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'location_links' AND policyname = 'Location links are readable by everyone'
  ) THEN
    CREATE POLICY "Location links are readable by everyone"
    ON public.location_links FOR SELECT USING (true);
  END IF;
END $$;

-- Location hours (flexible text with optional flags)
CREATE TABLE IF NOT EXISTS public.location_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  days TEXT NOT NULL, -- e.g. 'Lunes a Viernes'
  open_time TEXT,     -- e.g. '08:00'
  close_time TEXT,    -- e.g. '19:30'
  is_24_7 BOOLEAN DEFAULT FALSE,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.location_hours ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'location_hours' AND policyname = 'Location hours are readable by everyone'
  ) THEN
    CREATE POLICY "Location hours are readable by everyone"
    ON public.location_hours FOR SELECT USING (true);
  END IF;
END $$;

-- Location contacts
CREATE TABLE IF NOT EXISTS public.location_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  name TEXT,
  role TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.location_contacts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'location_contacts' AND policyname = 'Location contacts are readable by everyone'
  ) THEN
    CREATE POLICY "Location contacts are readable by everyone"
    ON public.location_contacts FOR SELECT USING (true);
  END IF;
END $$;

-- Location images (optional gallery)
CREATE TABLE IF NOT EXISTS public.location_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.location_images ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'location_images' AND policyname = 'Location images are readable by everyone'
  ) THEN
    CREATE POLICY "Location images are readable by everyone"
    ON public.location_images FOR SELECT USING (true);
  END IF;
END $$;
