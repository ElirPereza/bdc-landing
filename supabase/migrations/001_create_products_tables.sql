-- Create repuestos (spare parts) table
CREATE TABLE repuestos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create motocargueros table
CREATE TABLE motocargueros (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  specs JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to repuestos
CREATE TRIGGER update_repuestos_updated_at
  BEFORE UPDATE ON repuestos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to motocargueros
CREATE TRIGGER update_motocargueros_updated_at
  BEFORE UPDATE ON motocargueros
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE repuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE motocargueros ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (active products only)
CREATE POLICY "Allow public read access on repuestos" ON repuestos
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on motocargueros" ON motocargueros
  FOR SELECT USING (is_active = true);

-- Allow anon to read all (for dashboard without auth initially)
CREATE POLICY "Allow anon read all repuestos" ON repuestos
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon read all motocargueros" ON motocargueros
  FOR SELECT TO anon USING (true);

-- Allow anon to insert/update/delete (temporary - add auth later)
CREATE POLICY "Allow anon insert repuestos" ON repuestos
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon update repuestos" ON repuestos
  FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anon delete repuestos" ON repuestos
  FOR DELETE TO anon USING (true);

CREATE POLICY "Allow anon insert motocargueros" ON motocargueros
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon update motocargueros" ON motocargueros
  FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anon delete motocargueros" ON motocargueros
  FOR DELETE TO anon USING (true);

-- Insert sample data
INSERT INTO repuestos (name, description, image_url, price, stock, category) VALUES
  ('MOTOR 300', 'Máxima protección para tu motor. Compatible con múltiples modelos.', '/assets/repuesto-test.jpg', 1500.00, 10, 'Motores'),
  ('Kit de Bujías Iridium', 'Mayor durabilidad y rendimiento óptimo del motor.', '/assets/repuesto-test.jpg', 250.00, 25, 'Eléctrico'),
  ('Disco de Freno Ventilado', 'Frenado superior con tecnología de ventilación avanzada.', '/assets/repuesto-test.jpg', 350.00, 15, 'Frenos'),
  ('Cadena de Transmisión', 'Alta resistencia y durabilidad para cualquier terreno.', '/assets/repuesto-test.jpg', 180.00, 20, 'Transmisión'),
  ('Espejos Retrovisores', 'Diseño aerodinámico con visibilidad panorámica.', '/assets/repuesto-test.jpg', 85.00, 30, 'Accesorios'),
  ('Manillar Deportivo', 'Ergonomía perfecta para máximo control y confort.', '/assets/repuesto-test.jpg', 120.00, 12, 'Accesorios');

INSERT INTO motocargueros (name, description, image_url, price, specs) VALUES
  ('Kameyo 300', 'Potencia y diseño deportivo en perfecta armonía.', '/assets/motocarguero-test.jpg', 8500.00, '{"motor": "300cc", "carga": "500kg", "combustible": "Gasolina"}'),
  ('Cruiser Classic 800', 'Estilo atemporal con tecnología moderna.', '/assets/motocarguero-test.jpg', 12000.00, '{"motor": "800cc", "carga": "750kg", "combustible": "Gasolina"}'),
  ('Naked Street 600', 'Agilidad urbana con carácter agresivo.', '/assets/motocarguero-test.jpg', 9500.00, '{"motor": "600cc", "carga": "600kg", "combustible": "Gasolina"}'),
  ('Adventure 1200 GS', 'Lista para cualquier aventura, en cualquier terreno.', '/assets/motocarguero-test.jpg', 18000.00, '{"motor": "1200cc", "carga": "800kg", "combustible": "Gasolina"}'),
  ('Urban Scooter 300', 'Movilidad urbana eficiente y elegante.', '/assets/motocarguero-test.jpg', 6500.00, '{"motor": "300cc", "carga": "400kg", "combustible": "Gasolina"}'),
  ('Custom Bobber 750', 'Personalización extrema con alma rebelde.', '/assets/motocarguero-test.jpg', 11000.00, '{"motor": "750cc", "carga": "650kg", "combustible": "Gasolina"}');
