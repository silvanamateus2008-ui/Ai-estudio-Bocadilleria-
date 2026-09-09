export type ScreenId = 
  | 'SCR-01' // Autenticación & Onboarding
  | 'SCR-02' // Dashboard Principal (4 KPIs y Gráficos)
  | 'SCR-03' // Catálogo / Gestión con Tabla y Kanban
  | 'SCR-04' // Detalle 360 del Registro (FACT-2026-8942)
  | 'SCR-05' // Modal Wizard POS por Pasos
  | 'SCR-06' // Configuración & Perfil de Usuario
  | 'SCR-07'; // Consola & Calendario de Despachos

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  presentation: string;
  category: string;
  priceCOP: number;
  stockBoxes: number;
  stockPercentage: number;
  status: 'Disponible' | 'Agotándose' | 'Crítico';
  lotCode: string;
  pailaLocation: string;
  image: string;
}

export interface OrderItem {
  id: string;
  code: string;
  customerName: string;
  customerLocation: string;
  productName: string;
  quantity: number;
  totalCOP: number;
  status: 'Completado' | 'En Proceso' | 'Pendiente Stock';
  date: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  type: 'SYS_OK' | 'VENTA_NEW' | 'KARDEX' | 'LOGISTICA' | 'BATCH_CRON' | 'WARN';
  message: string;
}

export interface CalendarDispatch {
  day: number;
  dateStr: string;
  title: string;
  details: string;
  type: 'despacho' | 'acopio' | 'hito';
  status: 'Completado' | 'En Ruta' | 'Programado';
  truckPlate?: string;
  driver?: string;
  boxes?: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  code: string;
  level: 'ÉXITO' | 'INFO' | 'ALERTA' | 'CRÍTICO';
  station: string;
  description: string;
  operator: string;
  hash: string;
}
