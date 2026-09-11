-- =============================================================
-- Fábrica de Bocadillos La Esperanza · Supabase schema (0001)
-- Ejecutar en Supabase SQL Editor (Dashboard > SQL Editor).
-- Crea tablas, políticas RLS y datos semilla del dominio.
-- =============================================================

-- -------------------------------------------------------------
-- 1. TABLA: products (Catálogo de Productos y Referencias)
-- -------------------------------------------------------------
create table if not exists public.products (
  id               uuid primary key default gen_random_uuid(),
  sku              text not null unique,
  name             text not null,
  presentation     text not null default '',
  category         text not null default '',
  price_cop        integer not null default 0,
  stock_boxes      integer not null default 0,
  stock_percentage integer not null default 0,
  status           text not null default 'Disponible'
                     check (status in ('Disponible', 'Agotándose', 'Crítico')),
  lot_code         text not null default '',
  paila_location   text not null default '',
  image            text not null default '',
  created_at       timestamptz not null default now()
);

-- -------------------------------------------------------------
-- 2. TABLA: orders (Kárdex de Pedidos y Despachos Mayoristas)
-- -------------------------------------------------------------
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  code              text not null unique,
  customer_name     text not null,
  customer_location text not null default '',
  product_name      text not null default '',
  quantity          integer not null default 0,
  total_cop         integer not null default 0,
  status            text not null default 'En Proceso'
                      check (status in ('Completado', 'En Proceso', 'Pendiente Stock')),
  date              text not null default '',
  created_at        timestamptz not null default now()
);

-- -------------------------------------------------------------
-- 3. TABLA: audit_logs (Bitácora de Auditoría y Trazabilidad)
-- -------------------------------------------------------------
create table if not exists public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  timestamp   text not null,
  code        text not null,
  level       text not null default 'INFO'
                check (level in ('ÉXITO', 'INFO', 'ALERTA', 'CRÍTICO')),
  station     text not null default '',
  description text not null default '',
  operator    text not null default '',
  hash        text not null default '',
  created_at  timestamptz not null default now()
);

create unique index if not exists audit_logs_code_key on public.audit_logs (code);

-- -------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- Lectura pública (anon) + alta de pedidos desde el POS (anon).
-- Ajusta los policies si necesitas restringir más tarde.
-- -------------------------------------------------------------
alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.audit_logs  enable row level security;

-- Lectura de catálogo para la app web (VITE_SUPABASE_ANON_KEY)
create policy "products_read_public"  on public.products
  for select using (true);
create policy "orders_read_public"    on public.orders
  for select using (true);
create policy "audit_logs_read_public" on public.audit_logs
  for select using (true);

-- El POS (pantalla SCR-05) crea pedidos; el kárdex es de solo lectura
create policy "orders_insert_pos"     on public.orders
  for insert with check (true);

-- -------------------------------------------------------------
-- 5. DATOS SEMILLA (espejo de src/data/domainData.ts)
-- -------------------------------------------------------------
insert into public.products (sku, name, presentation, category, price_cop, stock_boxes, stock_percentage, status, lot_code, paila_location, image) values
  ('BOC-101', 'Bocadillo Veleño Lonja Tradicional', 'Hoja de Bijao x 500g', 'Tradicionales', 18000, 450, 90, 'Disponible', '#TAN-883', 'Paila Guavatá #2', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zXLAWcM-44Kljwqvgd0AR36gHz_b-gV6upDQlPK4Yn43xyvrFz8pTuEtj0BLy0u4Bh0DGCbbsJF_8xK-71vlgyAZQ3yKkJOAavlypm1gAM__7F172vMo3JMPGkWSBT79LNLe5vOMoiBqtaCD8Zn2uuisWVaGjEYlvTRvuQKPX1HnGIHZA7OteADuOROs0re91lcIaVJHCFIx-dmPhHpqxf62Xoz-mWNOBALgV_egO_Z6zjedg3oX'),
  ('BOC-102', 'Combinado Guayaba y Leche (Arequipe)', 'Caja x 24 Unidades', 'Especiales', 24000, 12, 15, 'Agotándose', '#TAN-879', 'Paila Barbosa #1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa66dCKlVneo827yc2R79n1rPG9P3E-G6_qwBOTlVl0HiicIOi_W6FhsAwCpfGzcVLRB5jkfIr0hqGbm2TUU5w3-K4wSuVjh8bA2YlnwTCmvwJdbVFTI9KSq_k_FaAG-MJ2X-vIlEy2baBiLX3KiiuUK-AQbqdlFlaSIUfvqPS7MsPOyDJ8rvmuu9hSG0Yc0HARM4HkiOhHAY61CAUYXsQjFsB94CDNo8V_ODWPhu6lDN08OOjXWZ2'),
  ('BOC-103', 'Conserva de Guayaba Fina Especial 500g', 'Frasco de vidrio hermético', 'Gourmet', 12500, 180, 65, 'Disponible', '#TAN-881', 'Paila Central Vélez', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsZ8JpO9MeCPS_sWukPy8rjtzAi8VlQi0xW001OXrmv2XsiSgRRjbkUEiLAEA2YjZEliV_XOGtwQdbv4nEuLEpdcZkV05Ed2JTi_38k6HXfdTOHN8YceGRnrNFeZIZCJpz3fKa5qFmRyhKkoU9ssjtg7-QljoCxSk527VlKqZkfmYIZqJaTKjoWQ_0xUDurMgZ4g_DLlUhs_5T9dsDQs7WrGuBRSbhoqbfrX2H992_KKZ1LY82p-xK'),
  ('BOC-104', 'Bocadillo Tumaco Extra Rojo', 'Bloque 1kg para repostería', 'Industrial', 28000, 95, 48, 'Disponible', '#TAN-875', 'Paila Chipatá #3', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhDJQyiTV6CNF41n1wA8sFlt1dQnCs6bAZSZtAmyhZrT7NU9ETuzo9Lj2MfYtZJW95xOEbYhfzm1FOK3Jter6ZFS1RRI8YaMdFB2x-EviQDmIxCG7Hw9OGct8QsgmHyNz0uSXcq41Mk3VQvQfmGTswCLsBjWmvdfd5WJ1q395wFahAIxj3gmFPctzcX-cE-eM8tLV2e0W75TCFnQ5nbjIw32MS8Kg_QfQkfTTlWtk_Ar_9rZbVEZIi'),
  ('BOC-105', 'Herpos Tradicionales Veleños x 12', 'Paquete artesanal hoja', 'Confitería', 16000, 8, 8, 'Crítico', '#TAN-872', 'Paila Puente Nacional', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaO2rxnS_G1RsYpALtuBcrSModVS1W3Flq8ccNQKxUXkkhv3KREBuYCdndAX8vANRT0uXuZ_rEaW0yvSDFAKh166dZAfQH46DtdNCNQjnPYkMW6CkOw-KhoLk8Xcmt_EHtKsgyfZwF3hIGItrIpN0RR6yuKiGD5v_fT9l3Uxg61JVY8Xruxlp-AQ_CC_A4ajRcPKS2IdAl9P2h3iI0GibL3qvBNA4EKxweusRL_Ots4TYnN2AES6kj'),
  ('BOC-106', 'Caja Regalo Bocadillo Surtido Premium', 'Caja de Madera Litografiada x 36', 'Gourmet', 35000, 64, 42, 'Disponible', '#TAN-891', 'Paila Central Vélez', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ffkZiwzlh7R28rXbFWdRqkI-7Jd3aE6RPCldYi8AEjFhIL7bIZXbyTSLlJa348roUOHOGb-EDb-duJFbyNM9MpmzOrnj_bh2oAa907z1e0ddQuICvddRyjKi1Xc3VzRDTAVSqZzkEf8JmeCEemXVr-7fHucy2F_NJUcNGoEtoTngY5QiQ-BjANOVbTwrWkVDKmfp133__NySLv8byr6C_Z2yQKUyjP77XVUJTeGkh5lSPAZU6KrP')
on conflict (sku) do nothing;

insert into public.orders (code, customer_name, customer_location, product_name, quantity, total_cop, status, date) values
  ('#VE-2026-089', 'Distribuidora Boyacá S.A.', 'Tunja, Boyacá', 'Lonja en Bijao x 500g', 120, 2160000, 'Completado', '14 Oct, 2026'),
  ('#VE-2026-090', 'Distribuidora Dulces del Fonce S.A.S.', 'San Gil, Santander', 'Bocadillo Veleño Lonja & Combinado', 100, 1850000, 'Completado', '14 Oct, 2026'),
  ('#VE-2026-091', 'Almacenes El Cóndor Tunja', 'Tunja, Boyacá', 'Caja Surtida x 24', 250, 6000000, 'En Proceso', '13 Oct, 2026'),
  ('#VE-2026-092', 'Supermercados del Chicamocha', 'Bucaramanga, Santander', 'Combinado Guayaba-Arequipe', 80, 1920000, 'Pendiente Stock', '12 Oct, 2026'),
  ('#VE-2026-093', 'Dulcería Tradición Bogotana', 'Bogotá D.C.', 'Tumaco Extra Rojo', 60, 1680000, 'Completado', '11 Oct, 2026')
on conflict (code) do nothing;

insert into public.audit_logs (timestamp, code, level, station, description, operator, hash) values
  ('14 Oct, 09:42:10', '#TRZ-9941', 'ÉXITO', 'Despacho Camiones', 'Guía #TR-7729 emitida para Camión TermoKing hacia San Gil con 100 cajas Lote #TAN-883.', 'Héctor Fabio Celis', '0x8f4a...29b1'),
  ('14 Oct, 09:00:15', '#TRZ-9940', 'INFO', 'Empaque Bijao', 'Control de esterilización y curado de hojas de bijao superado (Humedad: 14.2%, Grado A+).', 'Marta Solano (Mesa 4)', '0x2836...77c4'),
  ('14 Oct, 08:30:22', '#TRZ-9939', 'ÉXITO', 'Transacción DIAN', 'Factura Electrónica FACT-2026-8942 autorizada por DIAN con CUFE 894a-39b2-c01e.', 'Don Carlos Ruiz', '0xbc6c...99a0'),
  ('14 Oct, 07:15:08', '#TRZ-9938', 'INFO', 'Calderas & Pailas', 'Cocción Paila #2 completada a 75.0° Brix en caldera de cobre. Masa en enfriamiento.', 'Jorge Gómez', '0xd7e9...44a1'),
  ('13 Oct, 18:20:45', '#TRZ-9937', 'INFO', 'Molienda & Acopio', 'Recepción de 1.200 kg de guayaba regional de Guavatá. Acidez y maduración óptima.', 'Don Ramiro Vargas', '0xdda1...55e2'),
  ('13 Oct, 14:10:00', '#TRZ-9936', 'ALERTA', 'Calderas & Pailas', 'Fluctuación térmica menor en Caldera #1 (104.2°C). Válvula de alivio ajustada por operador.', 'Don Carlos Ruiz', '0x9a03...11f8')
on conflict (code) do nothing;