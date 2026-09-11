import React, { useEffect, useState } from 'react';
import { ScreenId, UIState, OrderItem } from '../types';
import { IMAGES } from '../data/domainData';
import { fetchOrders } from '../lib/api';
import { StateControlBar } from '../components/StateControlBar';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  Users, 
  Search, 
  Bell, 
  Plus, 
  Download, 
  Printer, 
  Filter, 
  AlertTriangle, 
  ExternalLink,
  Flame,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface Screen02DashboardProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string) => void;
}

export const Screen02Dashboard: React.FC<Screen02DashboardProps> = ({ onNavigate, showToast }) => {
  const [uiState, setUiState] = useState<UIState>('loading');
  const [ordersList, setOrdersList] = useState<OrderItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChartTab, setActiveChartTab] = useState<'resumen' | 'pedidos'>('resumen');
  const [timeFilter, setTimeFilter] = useState('6M');

  useEffect(() => {
    let mounted = true;
    fetchOrders()
      .then((data) => {
        if (!mounted) return;
        setOrdersList(data);
        setUiState(data.length > 0 ? 'normal' : 'empty');
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn('[SCR-02] Error cargando pedidos:', err);
        setUiState('error');
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredOrders = ordersList.filter((order) => {
    const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#bc6c25]">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder="Buscar lote, factura o cliente (Ctrl + K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fefae0] border border-[#bc6c25] rounded font-sans text-[#1d1c0d] focus:outline-hidden focus:border-[#283618]"
            />
            <Search className="w-3.5 h-3.5 text-[#8f4a00] absolute left-2.5 top-2.5" />
          </div>
          <button
            onClick={() => showToast('3 notificaciones: Lote #TAN-883 despachado, stock bajo en Guavatá.')}
            className="p-1.5 bg-[#fefae0] hover:bg-white border border-[#bc6c25] rounded text-[#8f4a00] relative"
            title="Notificaciones de Planta"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#9a031e] absolute -top-0.5 -right-0.5"></span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('SCR-05')}
            className="bg-[#bc6c25] hover:bg-[#8f4a00] text-[#fefae0] px-3.5 py-1.5 rounded text-xs font-bold font-sans flex items-center gap-1.5 retro-shadow retro-press border border-[#dda15e] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nuevo Registro (POS)</span>
          </button>
        </div>
      </div>

      {/* State Simulator Controller Bar */}
      <StateControlBar
        currentState={uiState}
        onSelectState={setUiState}
        onTriggerToast={() =>
          showToast('✓ Inventario de Bocadillo Veleño Lonja actualizado correctamente.')
        }
        screenCode="SCR-02"
      />

      {/* Error Alert Banner */}
      {uiState === 'error' && (
        <div className="bg-[#ffdad6] border-[2px] border-[#9a031e] text-[#9a031e] p-3.5 rounded flex items-center justify-between gap-3 retro-shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <strong className="block font-bold">Advertencia de Comunicación de Lotes:</strong>
              Error al sincronizar stock con el servidor MySQL Vélez-Central (Error 504 Gateway Timeout). Los datos mostrados corresponden a la última réplica en caché local.
            </div>
          </div>
          <button
            onClick={() => setUiState('normal')}
            className="bg-[#9a031e] text-white text-xs px-3 py-1 rounded font-bold hover:bg-[#800010] transition-colors shrink-0"
          >
            Reintentar Ahora
          </button>
        </div>
      )}

      {/* Hero Banner */}
      <div className="bg-[#f4f1de] border-[3px] border-[#bc6c25] rounded p-4 sm:p-5 retro-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded border-2 border-[#bc6c25] overflow-hidden bg-white shrink-0 p-1">
            <img
              src={IMAGES.botanicalEngraving}
              alt="Grabado Botánico Guayaba"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="bg-[#283618] text-[#dda15e] text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                DENOMINACIÓN DE ORIGEN PROTEGIDA • VÉLEZ SANTANDER
              </span>
              <span className="text-[10px] font-mono text-[#544438]">
                TURNO PAILA #2 · COCCIÓN A 75° BRIX
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1d1c0d]">
              Libro Mayor de Producción y Despachos
            </h1>
            <p className="text-xs text-[#544438] max-w-2xl mt-0.5 font-sans">
              Monitoreo en tiempo real de molienda de guayaba regional, empaquetado en hoja de bijao de Barbosa y despachos mayoristas interdepartamentales.
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#bc6c25]/30">
          <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
            FECHA DEL SISTEMA
          </span>
          <span className="font-mono text-xs font-bold text-[#1d1c0d] bg-[#fefae0] px-2.5 py-1 rounded border border-[#bc6c25]">
            14 Octubre, 2026
          </span>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3.5 rounded retro-shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#544438] mb-1">
              <span>SEC // 01 · ACTIVOS</span>
              <span className="text-emerald-800 font-bold bg-[#d7e9bd] px-1.5 py-0.5 rounded">
                +12% vs mes ant.
              </span>
            </div>
            <div className="font-serif text-2xl font-bold text-[#1d1c0d] my-1">
              48 Lotes
            </div>
            <p className="text-xs text-[#544438] font-sans">
              Bocadillo terminado en bodega central de Vélez
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 text-[10px] font-mono text-[#8f4a00]">
            Capacidad en estiba: <strong>82% Utilizada</strong>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3.5 rounded retro-shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#544438] mb-1">
              <span>SEC // 02 · CUMPLIMIENTO</span>
              <span className="text-emerald-800 font-bold bg-[#d7e9bd] px-1.5 py-0.5 rounded">
                Óptimo Vélez
              </span>
            </div>
            <div className="font-serif text-2xl font-bold text-[#1d1c0d] my-1">
              94.2%
            </div>
            <p className="text-xs text-[#544438] font-sans">
              Entregas a tiempo en Santander y Boyacá
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 text-[10px] font-mono text-[#8f4a00]">
            Reclamos por empaque: <strong>0.08%</strong>
          </div>
        </div>

        {/* KPI 3 (Shows Loading Skeleton when state is loading) */}
        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3.5 rounded retro-shadow-sm flex flex-col justify-between">
          {uiState === 'loading' ? (
            <div className="space-y-2 animate-pulse py-1">
              <div className="h-3 bg-[#e7e3ca] rounded w-2/3"></div>
              <div className="h-7 bg-[#dda15e]/50 rounded w-1/2"></div>
              <div className="h-3 bg-[#e7e3ca] rounded w-full"></div>
              <div className="h-3 bg-[#e7e3ca] rounded w-4/5 pt-2"></div>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#544438] mb-1">
                  <span>SEC // 03 · VELOCIDAD</span>
                  <span className="text-[#8f4a00] font-bold bg-[#dda15e]/30 px-1.5 py-0.5 rounded">
                    -0.4 días
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#1d1c0d] my-1">
                  2.3 días
                </div>
                <p className="text-xs text-[#544438] font-sans">
                  Tiempo de procesamiento desde paila a despacho
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 text-[10px] font-mono text-[#8f4a00]">
                Enfriado de jalea: <strong>14 Horas ref.</strong>
              </div>
            </>
          )}
        </div>

        {/* KPI 4 */}
        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3.5 rounded retro-shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#544438] mb-1">
              <span>SEC // 04 · ALIANZAS</span>
              <span className="text-[#283618] font-bold bg-[#d7e9bd] px-1.5 py-0.5 rounded">
                Red Andina
              </span>
            </div>
            <div className="font-serif text-2xl font-bold text-[#1d1c0d] my-1">
              16 Distribuidores
            </div>
            <p className="text-xs text-[#544438] font-sans">
              Mayoristas activos con convenio comercial vigente
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 text-[10px] font-mono text-[#8f4a00]">
            Nuevas solicitudes: <strong>3 En Verificación</strong>
          </div>
        </div>
      </div>

      {/* Analytics Section: Chart & Ledger Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Bar Chart Container (8 cols) */}
        <div className="lg:col-span-8 bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-4 sm:p-5 retro-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-[#bc6c25]/30">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
                RENDIMIENTO Y DESPACHOS MENSUALES
              </span>
              <h3 className="font-serif text-base font-bold text-[#1d1c0d]">
                Producción de Bocadillo Veleño Extra (Cajas vs Lonjas)
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setTimeFilter('1M')}
                className={`px-2 py-0.5 rounded ${timeFilter === '1M' ? 'bg-[#bc6c25] text-white font-bold' : 'bg-[#fefae0] text-[#544438]'}`}
              >
                1M
              </button>
              <button
                onClick={() => setTimeFilter('3M')}
                className={`px-2 py-0.5 rounded ${timeFilter === '3M' ? 'bg-[#bc6c25] text-white font-bold' : 'bg-[#fefae0] text-[#544438]'}`}
              >
                3M
              </button>
              <button
                onClick={() => setTimeFilter('6M')}
                className={`px-2 py-0.5 rounded ${timeFilter === '6M' ? 'bg-[#bc6c25] text-white font-bold' : 'bg-[#fefae0] text-[#544438]'}`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeFilter('1A')}
                className={`px-2 py-0.5 rounded ${timeFilter === '1A' ? 'bg-[#bc6c25] text-white font-bold' : 'bg-[#fefae0] text-[#544438]'}`}
              >
                1A
              </button>
            </div>
          </div>

          {/* Retro Bar Chart Visualizer */}
          <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6 pb-2 border-b-2 border-dashed border-[#bc6c25]/40 font-mono text-[10px]">
            {/* Month 1: Mayo */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[#8f4a00] font-bold">3,800</span>
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div style={{ height: '55%' }} className="w-1/2 bg-[#bc6c25] rounded-t" title="Cajas x 24: 2,100"></div>
                <div style={{ height: '45%' }} className="w-1/2 bg-[#283618] rounded-t" title="Lonja Bijao: 1,700"></div>
              </div>
              <span className="text-[#544438] mt-1 font-bold">May</span>
            </div>

            {/* Month 2: Junio */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[#8f4a00] font-bold">4,450</span>
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div style={{ height: '65%' }} className="w-1/2 bg-[#bc6c25] rounded-t"></div>
                <div style={{ height: '50%' }} className="w-1/2 bg-[#283618] rounded-t"></div>
              </div>
              <span className="text-[#544438] mt-1 font-bold">Jun</span>
            </div>

            {/* Month 3: Julio */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[#8f4a00] font-bold">5,100</span>
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div style={{ height: '75%' }} className="w-1/2 bg-[#bc6c25] rounded-t"></div>
                <div style={{ height: '60%' }} className="w-1/2 bg-[#283618] rounded-t"></div>
              </div>
              <span className="text-[#544438] mt-1 font-bold">Jul</span>
            </div>

            {/* Month 4: Agosto */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[#8f4a00] font-bold">4,900</span>
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div style={{ height: '70%' }} className="w-1/2 bg-[#bc6c25] rounded-t"></div>
                <div style={{ height: '58%' }} className="w-1/2 bg-[#283618] rounded-t"></div>
              </div>
              <span className="text-[#544438] mt-1 font-bold">Ago</span>
            </div>

            {/* Month 5: Septiembre */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[#8f4a00] font-bold">6,800</span>
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div style={{ height: '85%' }} className="w-1/2 bg-[#bc6c25] rounded-t"></div>
                <div style={{ height: '75%' }} className="w-1/2 bg-[#283618] rounded-t"></div>
              </div>
              <span className="text-[#544438] mt-1 font-bold">Sep</span>
            </div>

            {/* Month 6: Octubre (Pico Actual) */}
            <div className="flex-1 flex flex-col items-center gap-1 bg-[#dda15e]/20 p-1 rounded border border-[#bc6c25]">
              <span className="text-[#9a031e] font-bold text-[11px]">8,420 ★</span>
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div style={{ height: '96%' }} className="w-1/2 bg-[#8f4a00] rounded-t"></div>
                <div style={{ height: '88%' }} className="w-1/2 bg-[#283618] rounded-t"></div>
              </div>
              <span className="text-[#8f4a00] mt-1 font-bold">Oct</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs mt-3 text-[#544438]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#bc6c25] inline-block rounded-xs"></span>
                <span>Caja Surtida x 24 Und</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#283618] inline-block rounded-xs"></span>
                <span>Lonja en Hoja de Bijao</span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-[#8f4a00]">
              Pico Octubre: +28% Mayoristas
            </span>
          </div>
        </div>

        {/* Right: Ledger Balance Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-4 rounded retro-shadow-sm">
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold block">
              ACOPIO ACUMULADO
            </span>
            <div className="font-serif text-xl font-bold text-[#1d1c0d] mt-1">
              62.4 Toneladas
            </div>
            <p className="text-xs text-[#544438] mt-1 font-sans leading-snug">
              Guayaba regional acopiada en Vélez, Guavatá y Chipatá. Representa el 78% de la cuota anual para Denominación de Origen.
            </p>
            <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 flex items-center justify-between text-[11px] font-mono text-[#283618]">
              <span>Merma controlada: 2.1%</span>
              <span className="font-bold text-emerald-800">✓ Conforme</span>
            </div>
          </div>

          <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-4 rounded retro-shadow-sm">
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold block">
              DESPACHOS TRADICIONALES
            </span>
            <div className="font-serif text-xl font-bold text-[#1d1c0d] mt-1">
              38,450 Cajas
            </div>
            <p className="text-xs text-[#544438] mt-1 font-sans leading-snug">
              Empacadas en hoja de bijao 100% biodegradable recolectada en la cuenca del Río Suárez.
            </p>
            <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 flex items-center justify-between text-[11px] font-mono text-[#8f4a00]">
              <span>Rutas activas: 8</span>
              <button
                onClick={() => onNavigate('SCR-07')}
                className="hover:underline font-bold flex items-center gap-1"
              >
                <span>Ver Consola</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Ledger Table */}
      <div className="bg-[#fefae0] border-[3px] border-[#bc6c25] rounded retro-shadow overflow-hidden">
        {/* Table Header & Filters */}
        <div className="bg-[#f4f1de] p-4 border-b-2 border-[#bc6c25] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
              KÁRDEX TRANSACCIONAL // DIAN HABILITADO
            </span>
            <h3 className="font-serif text-base font-bold text-[#1d1c0d]">
              Libro de Pedidos y Despachos Mayoristas
            </h3>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1 text-xs overflow-x-auto">
            {['Todos', 'Completado', 'En Proceso', 'Pendiente Stock'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded text-xs font-sans whitespace-nowrap transition-all ${
                  statusFilter === status
                    ? 'bg-[#283618] text-[#fefae0] font-bold retro-shadow-sm'
                    : 'bg-[#fefae0] text-[#544438] hover:bg-white border border-[#bc6c25]/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State in Table */}
        {uiState === 'empty' || (filteredOrders.length === 0 && uiState !== 'loading') ? (
          <div className="p-8 text-center bg-[#fefae0]">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f4f1de] border-2 border-[#bc6c25] flex items-center justify-center text-[#8f4a00]">
              <Package className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#1d1c0d]">
              No hay pedidos registrados en este periodo
            </h4>
            <p className="text-xs text-[#544438] max-w-sm mx-auto mt-1 mb-4 font-sans">
              No se encontraron transacciones activas con los filtros seleccionados en el kárdex de Vélez.
            </p>
            <button
              onClick={() => {
                setStatusFilter('Todos');
                setSearchQuery('');
                setUiState('normal');
              }}
              className="bg-[#bc6c25] hover:bg-[#8f4a00] text-white text-xs px-3.5 py-1.5 rounded font-bold retro-shadow-sm transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          /* Table Content */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#283618] text-[#fefae0] text-[10px] font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3">Código Pedido</th>
                  <th className="p-3">Cliente Mayorista</th>
                  <th className="p-3">Producto Artesanal</th>
                  <th className="p-3 text-center">Cantidad</th>
                  <th className="p-3 text-right">Total COP</th>
                  <th className="p-3">Estado Despacho</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bc6c25]/30 bg-white">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#fefae0]/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#8f4a00]">
                      {order.code}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-[#1d1c0d]">{order.customerName}</div>
                      <div className="text-[10px] text-[#544438]">{order.customerLocation}</div>
                    </td>
                    <td className="p-3 text-[#1d1c0d]">{order.productName}</td>
                    <td className="p-3 text-center font-mono font-semibold">
                      {order.quantity} cajas
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-[#1d1c0d]">
                      ${order.totalCOP.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          order.status === 'Completado'
                            ? 'bg-[#d7e9bd] text-[#283618] border border-[#283618]/30'
                            : order.status === 'En Proceso'
                            ? 'bg-[#dda15e]/30 text-[#8f4a00] border border-[#bc6c25]'
                            : 'bg-[#ffdad6] text-[#9a031e] border border-[#9a031e]'
                        }`}
                      >
                        {order.status === 'Completado' ? '✓ ' : '• '}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            showToast(`Abriendo expediente ${order.code}...`);
                            onNavigate('SCR-04');
                          }}
                          className="px-2 py-1 bg-[#f4f1de] hover:bg-[#bc6c25] hover:text-white text-[#8f4a00] rounded text-[11px] font-mono border border-[#bc6c25] transition-colors"
                          title="Ver Detalle 360 y Remisión"
                        >
                          [Remisión]
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        <div className="p-3 bg-[#f4f1de] border-t border-[#bc6c25] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#544438]">
          <span>
            Mostrando <strong>{filteredOrders.length}</strong> de {ordersList.length} remisiones registradas
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Generando archivo CSV Contable para DIAN...')}
              className="px-2.5 py-1 bg-[#fefae0] hover:bg-white text-[#1d1c0d] rounded border border-[#bc6c25] flex items-center gap-1 text-[11px]"
            >
              <Download className="w-3 h-3 text-[#8f4a00]" />
              <span>CSV Contable</span>
            </button>
            <button
              onClick={() => showToast('Enviando remisión a impresora de despacho...')}
              className="px-2.5 py-1 bg-[#fefae0] hover:bg-white text-[#1d1c0d] rounded border border-[#bc6c25] flex items-center gap-1 text-[11px]"
            >
              <Printer className="w-3 h-3 text-[#8f4a00]" />
              <span>Imprimir Libro</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
