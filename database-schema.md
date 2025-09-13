# Baja Film Factory - Database Schema

## Locations Table

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location_address TEXT NOT NULL,
  hours VARCHAR(255),
  parking_link TEXT,
  parking_name VARCHAR(255),
  restroom_link TEXT,
  restroom_name VARCHAR(255),
  image_url TEXT,
  tags TEXT[], -- Array of tags like ['urbano', 'cultural', 'exterior']
  rating DECIMAL(2,1) DEFAULT 0,
  accessibility_info TEXT,
  services TEXT[], -- Array of available services
  regulations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

## Sample Data Structure

Based on your data, here's how it would be structured:

### Centro Cultural Tijuana
```json
{
  "id": "08a6561d-c133-454a-a77a-2f046067a504",
  "name": "Centro Cultural Tijuana",
  "description": "Icónico centro cultural con arquitectura moderna y espacios versátiles para producciones.",
  "location_address": "Tijuana Cultural Center",
  "hours": "Martes a Domingo, 10:00 AM - 6:00 PM",
  "parking_link": "https://maps.google.com/?q=parking+Centro+Cultural+Tijuana",
  "parking_name": "Enlace Google Maps",
  "restroom_link": "https://maps.google.com/?q=Omnimax+Centro+Cultural+Tijuana",
  "restroom_name": "Omnimax",
  "image_url": "/img/location/Centroculturaltijuana.jpeg",
  "tags": ["cultural", "arquitectónico", "interior"],
  "rating": 4.8,
  "updated_at": "2025-09-13T00:00:00Z"
}
```

### Avenida Revolución
```json
{
  "id": "1feac484-6f87-4fae-af95-5bc4c227d3f6",
  "name": "Avenida Revolución",
  "description": "Emblemática avenida con ambiente urbano vibrante, perfecta para escenas callejeras.",
  "location_address": "Av. Revolución",
  "hours": "24/7 (Abierto todo el día)",
  "parking_link": "https://maps.google.com/?q=Old+Jai+Alai+Palace+Forum+Entertainment+Center",
  "parking_name": "Old Jai Alai Palace Forum - Entertainment Center",
  "restroom_link": "https://maps.google.com/?q=Restaurante+Bar+Tia+Juana+Tillys",
  "restroom_name": "Restaurante-Bar Tia Juana Tilly's",
  "image_url": "/img/location/ave-revolucion-2.jpg",
  "tags": ["urbano", "comercial", "exterior"],
  "rating": 4.5,
  "updated_at": "2025-09-13T00:00:00Z"
}
```

## Additional Tables

### Providers Table
```sql
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- 'equipment', 'catering', 'talent', 'hotels', etc.
  description TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  website TEXT,
  services TEXT[], -- Array of services offered
  location VARCHAR(255),
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### Users Table (for admin functionality)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer', -- 'admin', 'editor', 'viewer'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

## Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Public read access for locations and providers
CREATE POLICY "Public read access" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON providers FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admin write access" ON locations FOR ALL USING (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);
CREATE POLICY "Admin write access" ON providers FOR ALL USING (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);
```

## CSV Import Structure

For importing your data, create CSV files with these headers:

### locations.csv
```
id,name,description,location_address,hours,parking_link,parking_name,restroom_link,restroom_name,image_url,tags,rating
```

### providers.csv
```
id,name,category,description,contact_email,contact_phone,website,services,location,rating
```