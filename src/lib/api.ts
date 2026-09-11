import { ProductItem, OrderItem, AuditLogItem } from '../types';
import { PRODUCTS_DATA, ORDERS_DATA, AUDIT_LOGS_DATA } from '../data/domainData';
import { supabase, requireSupabase } from './supabaseClient';

type DbProductRow = {
  id: string;
  sku: string;
  name: string;
  presentation: string;
  category: string;
  price_cop: number;
  stock_boxes: number;
  stock_percentage: number;
  status: ProductItem['status'];
  lot_code: string;
  paila_location: string;
  image: string;
};

type DbOrderRow = {
  id: string;
  code: string;
  customer_name: string;
  customer_location: string;
  product_name: string;
  quantity: number;
  total_cop: number;
  status: OrderItem['status'];
  date: string;
};

type DbAuditRow = {
  id: string;
  timestamp: string;
  code: string;
  level: AuditLogItem['level'];
  station: string;
  description: string;
  operator: string;
  hash: string;
};

function isProductStatus(v: string): v is ProductItem['status'] {
  return ['Disponible', 'Agotándose', 'Crítico'].includes(v);
}

function isOrderStatus(v: string): v is OrderItem['status'] {
  return ['Completado', 'En Proceso', 'Pendiente Stock'].includes(v);
}

function isAuditLevel(v: string): v is AuditLogItem['level'] {
  return ['ÉXITO', 'INFO', 'ALERTA', 'CRÍTICO'].includes(v);
}

function mapProductRow(row: DbProductRow): ProductItem {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    presentation: row.presentation,
    category: row.category,
    priceCOP: row.price_cop,
    stockBoxes: row.stock_boxes,
    stockPercentage: row.stock_percentage,
    status: isProductStatus(row.status) ? row.status : 'Disponible',
    lotCode: row.lot_code,
    pailaLocation: row.paila_location,
    image: row.image,
  };
}

function mapOrderRow(row: DbOrderRow): OrderItem {
  return {
    id: row.id,
    code: row.code,
    customerName: row.customer_name,
    customerLocation: row.customer_location,
    productName: row.product_name,
    quantity: row.quantity,
    totalCOP: row.total_cop,
    status: isOrderStatus(row.status) ? row.status : 'En Proceso',
    date: row.date,
  };
}

function mapAuditRow(row: DbAuditRow): AuditLogItem {
  return {
    id: row.id,
    timestamp: row.timestamp,
    code: row.code,
    level: isAuditLevel(row.level) ? row.level : 'INFO',
    station: row.station,
    description: row.description,
    operator: row.operator,
    hash: row.hash,
  };
}

function warnFallback(table: string, err: unknown) {
  console.warn(
    `[api] No se pudo leer de Supabase (tabla "${table}"): mostrando datos mock.`,
    err
  );
}

export async function fetchProducts(): Promise<ProductItem[]> {
  if (!supabase) {
    warnFallback('products', 'supabase no configurado');
    return PRODUCTS_DATA;
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sku', { ascending: true });
  if (error || !data) {
    warnFallback('products', error);
    return PRODUCTS_DATA;
  }
  return (data as DbProductRow[]).map(mapProductRow);
}

export async function fetchOrders(): Promise<OrderItem[]> {
  if (!supabase) {
    warnFallback('orders', 'supabase no configurado');
    return ORDERS_DATA;
  }
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) {
    warnFallback('orders', error);
    return ORDERS_DATA;
  }
  return (data as DbOrderRow[]).map(mapOrderRow);
}

export async function fetchAuditLogs(): Promise<AuditLogItem[]> {
  if (!supabase) {
    warnFallback('audit_logs', 'supabase no configurado');
    return AUDIT_LOGS_DATA;
  }
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) {
    warnFallback('audit_logs', error);
    return AUDIT_LOGS_DATA;
  }
  return (data as DbAuditRow[]).map(mapAuditRow);
}

export type NewOrder = Omit<OrderItem, 'id'>;

export async function createOrder(order: NewOrder): Promise<OrderItem | null> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('orders')
    .insert({
      code: order.code,
      customer_name: order.customerName,
      customer_location: order.customerLocation,
      product_name: order.productName,
      quantity: order.quantity,
      total_cop: order.totalCOP,
      status: order.status,
      date: order.date,
    })
    .select()
    .single();
  if (error) throw error;
  return mapOrderRow(data as DbOrderRow);
}