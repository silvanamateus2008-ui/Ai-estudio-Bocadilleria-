import React, { useState } from 'react';
import { ScreenId, UIState } from '../types';
import { createOrder, NewOrder } from '../lib/api';
import { StateControlBar } from '../components/StateControlBar';
import { 
  X, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Info,
  Flame,
  Minus,
  CheckCircle2
} from 'lucide-react';

interface Screen05ModalWizardProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string) => void;
}

interface CartItem {
  id: string;
  sku: string;
  name: string;
  lot: string;
  paila: string;
  unitPrice: number;
  qty: number;
}

export const Screen05ModalWizard: React.FC<Screen05ModalWizardProps> = ({
  onNavigate,
  showToast,
}) => {
  const [uiState, setUiState] = useState<UIState>('normal');
  const [step, setStep] = useState<1 | 2 | 3>(2);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'c1',
      sku: 'BOC-101',
      name: 'Bocadillo Veleño Lonja Hoja Bijao x 500g',
      lot: '#TAN-883',
      paila: 'Paila Guavatá #2',
      unitPrice: 18000,
      qty: 20,
    },
    {
      id: 'c2',
      sku: 'BOC-106',
      name: 'Caja Regalo Bocadillo Surtido Premium',
      lot: '#TAN-891',
      paila: 'Bodega Central Vélez',
      unitPrice: 25000,
      qty: 10,
    },
  ]);

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.qty + delta);
            return { ...item, qty: newQty };
          }
          return item;
        })
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Pricing math
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const totalBoxes = cart.reduce((acc, item) => acc + item.qty, 0);
  const discount = Math.round(subtotal * 0.05); // 5% Pronto Pago
  const baseGravable = subtotal - discount;
  const iva = Math.round(baseGravable * 0.19);
  const reteFuente = Math.round(baseGravable * 0.025);
  const totalNeto = baseGravable + iva - reteFuente;

  const handleSaveDraft = () => {
    showToast('Borrador Guardado: Transacción persistida en HttpSession (Payara 7)');
  };

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      showToast('Agregue al menos un producto al pedido.');
      return;
    }
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const order: NewOrder = {
      code: `#ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Distribuidora Dulces del Fonce S.A.S.',
      customerLocation: 'San Gil, Santander',
      productName: cart.map((i) => i.name).join(' + '),
      quantity: totalBoxes,
      totalCOP: totalNeto,
      status: 'En Proceso',
      date: dateStr,
    };
    try {
      await createOrder(order);
      showToast(`¡Orden ${order.code} confirmada y persistida en Supabase!`);
    } catch (err) {
      console.warn('[SCR-05] No se pudo guardar la orden en Supabase:', err);
      showToast('¡Orden FACT-2026-9041 confirmada (modo local: Supabase no disponible)!');
    }
    setTimeout(() => {
      onNavigate('SCR-04');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#283618]/70 backdrop-blur-xs p-3 sm:p-6 flex flex-col justify-center items-center">
      {/* State Switcher on top */}
      <div className="w-full max-w-5xl mb-3">
        <StateControlBar
          currentState={uiState}
          onSelectState={setUiState}
          onTriggerToast={() =>
            showToast('Borrador Guardado: Transacción persistida en HttpSession (Payara 7)')
          }
          screenCode="SCR-05"
        />
      </div>

      {/* Main High-Density Modal */}
      <div className="bg-[#fefae0] w-full max-w-5xl rounded border-[3px] border-[#bc6c25] retro-shadow-lg flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Window Top Header */}
        <div className="bg-[#283618] text-[#fefae0] p-3 sm:p-4 border-b-2 border-[#dda15e] flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#dda15e]">
              <span className="font-bold uppercase tracking-wider">
                MÓDULO TRANSACCIONAL POS // VÉLEZ SANTANDER
              </span>
              <span>•</span>
              <span>FACTURACIÓN MAYORISTA</span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
              Nueva Orden de Despacho & Venta Mayorista
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#bc6c25] text-white px-2.5 py-1 rounded text-xs font-mono font-bold border border-[#dda15e]">
              BORRADOR #ORD-2026-9041
            </span>
            <button
              onClick={() => onNavigate('SCR-02')}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-[#1b2413] rounded transition-colors"
              title="Cerrar y volver al Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customer & Operator Banner */}
        <div className="bg-[#f4f1de] px-4 py-2 border-b border-[#bc6c25] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
          <div className="text-[#1d1c0d]">
            <strong>Cliente: </strong>
            <span>Distribuidora Dulces del Fonce S.A.S. (NIT 890.102.948-1 • San Gil)</span>
            <span className="ml-2 bg-[#d7e9bd] text-[#283618] text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
              Tarifa Especial Distribuidor A+
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#544438]">
            OPERADOR POS: <strong>Don Carlos Ruiz</strong> (Caja Central)
          </div>
        </div>

        {/* 3-Step Wizard Navigation Strip */}
        <div className="bg-[#ede9cf] border-b-2 border-[#bc6c25] px-4 py-2.5 grid grid-cols-3 gap-2 text-xs font-sans">
          {/* Step 1 */}
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 p-1.5 rounded transition-all text-left ${
              step === 1 ? 'bg-[#fefae0] font-bold border border-[#bc6c25]' : 'text-[#544438]'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-mono text-[10px] font-bold">
              ✓
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono block text-[#283618]">PASO 1 [COMPLETADO]</span>
              <span className="text-xs">Datos del Cliente Mayorista</span>
            </div>
          </button>

          {/* Step 2 (Active) */}
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 p-1.5 rounded transition-all text-left ${
              step === 2
                ? 'bg-[#bc6c25] text-white font-bold retro-shadow-sm border border-[#8f4a00]'
                : 'text-[#544438]'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#fefae0] text-[#8f4a00] flex items-center justify-center font-mono text-[10px] font-bold">
              2
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono block text-[#fefae0]">PASO 2 [ACTUAL]</span>
              <span className="text-xs">Selección de Bocadillos & Stock</span>
            </div>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-2 p-1.5 rounded transition-all text-left opacity-70 ${
              step === 3 ? 'bg-[#fefae0] font-bold border border-[#bc6c25]' : 'text-[#544438]'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#544438] text-white flex items-center justify-center font-mono text-[10px] font-bold">
              3
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono block">PASO 3 [PENDIENTE]</span>
              <span className="text-xs">Confirmación & Facturación</span>
            </div>
          </button>
        </div>

        {/* Modal Error Alert if triggered */}
        {uiState === 'error' && (
          <div className="m-4 bg-[#ffdad6] border-2 border-[#9a031e] text-[#9a031e] p-3 rounded flex items-center justify-between gap-3 text-xs retro-shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                <strong>⚠️ Stock Insuficiente:</strong> Solo quedan 2 cajas disponibles para Caja Regalo Bocadillo Surtido en la bodega de Vélez (Solicitadas: 10).
              </span>
            </div>
            <button
              onClick={() => {
                setCart((prev) =>
                  prev.map((it) => (it.sku === 'BOC-106' ? { ...it, qty: 2 } : it))
                );
                setUiState('normal');
                showToast('Ajustado a 2 cajas en existencia.');
              }}
              className="bg-[#9a031e] text-white text-[10px] px-2.5 py-1 rounded font-bold shrink-0"
            >
              Ajustar a 2 Cajas
            </button>
          </div>
        )}

        {/* Modal Body: 2 Columns */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto max-h-[60vh]">
          {/* Left Column (7 cols): Draft Product Entry & Table */}
          <div className="lg:col-span-7 space-y-4">
            {/* Quick Add Bar */}
            <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] flex flex-col sm:flex-row items-center gap-2">
              <select className="text-xs bg-white border border-[#bc6c25] rounded p-2 flex-1 w-full sm:w-auto font-sans">
                <option value="BOC-101">BOC-101 - Bocadillo Veleño Lonja Hoja x 500g ($18.000)</option>
                <option value="BOC-102">BOC-102 - Combinado Guayaba-Arequipe x 24 ($24.000)</option>
                <option value="BOC-103">BOC-103 - Conserva de Guayaba Fina 500g ($12.500)</option>
                <option value="BOC-104">BOC-104 - Tumaco Extra Rojo Bloque 1kg ($28.000)</option>
              </select>

              <button
                onClick={() => {
                  showToast('Lote #TAN-883 agregado al borrador de pedido.');
                }}
                className="bg-[#283618] hover:bg-[#1b2413] text-[#dda15e] text-xs font-bold px-3 py-2 rounded flex items-center gap-1 shrink-0 retro-shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar al Pedido</span>
              </button>
            </div>

            {/* Draft Items Table */}
            <div className="bg-white border-2 border-[#bc6c25] rounded overflow-hidden">
              <div className="bg-[#f4f1de] px-3 py-2 border-b border-[#bc6c25] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8f4a00] font-bold">
                  ÍTEMS EN BORRADOR ACTUAL ({cart.length} renglones)
                </span>
                <span className="text-[10px] text-[#544438]">
                  PERSISTENCIA: HTTP-SESSION (PAYARA 7)
                </span>
              </div>

              {uiState === 'empty' || cart.length === 0 ? (
                <div className="p-8 text-center bg-[#fefae0]">
                  <ShoppingCart className="w-10 h-10 mx-auto text-[#bc6c25] mb-2" />
                  <h4 className="font-serif text-sm font-bold text-[#1d1c0d]">
                    Carrito Vacío
                  </h4>
                  <p className="text-xs text-[#544438] mt-1 mb-3 font-sans">
                    No has agregado ningún lote de bocadillo al borrador de despacho.
                  </p>
                  <button
                    onClick={() => {
                      setCart([
                        {
                          id: 'c1',
                          sku: 'BOC-101',
                          name: 'Bocadillo Veleño Lonja Hoja Bijao x 500g',
                          lot: '#TAN-883',
                          paila: 'Paila Guavatá #2',
                          unitPrice: 18000,
                          qty: 20,
                        },
                      ]);
                      setUiState('normal');
                    }}
                    className="bg-[#bc6c25] text-white text-xs px-3 py-1.5 rounded font-bold"
                  >
                    + Explorar Catálogo de Fábrica
                  </button>
                </div>
              ) : (
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#283618] text-[#fefae0] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Producto & Lote</th>
                      <th className="p-2.5 text-center">Cantidad</th>
                      <th className="p-2.5 text-right">Subtotal</th>
                      <th className="p-2.5 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#bc6c25]/30 font-sans">
                    {cart.map((item) => (
                      <tr key={item.id} className="hover:bg-[#fefae0]/80">
                        <td className="p-2.5">
                          <div className="font-bold text-[#1d1c0d] font-serif">
                            {item.name}
                          </div>
                          <div className="text-[10px] font-mono text-[#8f4a00]">
                            SKU: {item.sku} • {item.lot} ({item.paila})
                          </div>
                        </td>
                        <td className="p-2.5 text-center">
                          <div className="inline-flex items-center border border-[#bc6c25] rounded bg-[#f4f1de]">
                            <button
                              onClick={() => updateQty(item.id, -5)}
                              className="p-1 hover:bg-[#bc6c25] hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 5)}
                              className="p-1 hover:bg-[#bc6c25] hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="block text-[9px] text-[#544438] font-mono">cajas</span>
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-[#1d1c0d]">
                          ${(item.unitPrice * item.qty).toLocaleString('es-CO')}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-[#9a031e] hover:bg-[#ffdad6] rounded transition-colors"
                            title="Eliminar del borrador"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Stock Verification Strip */}
            <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] text-xs text-[#544438] font-mono">
              <div className="flex items-center gap-1.5 text-[#283618] font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Stock Verificado en Bodega: 450 cajas en existencia</span>
              </div>
              <p className="text-[10px] leading-snug">
                15 cajas restantes para despacho prioritario. Las lonjas se despachan con hojas de bijao frescas recolectadas de la cuenca del Río Suárez.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Live Calculation Sidebar */}
          <div className="lg:col-span-5 bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-4 retro-shadow space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#bc6c25]/30">
                <h4 className="font-serif text-sm font-bold text-[#1d1c0d]">
                  Liquidación // TURNO PAILA #2
                </h4>
                <span className="text-[10px] font-mono text-[#8f4a00] font-bold">
                  DIAN RES. 18764028
                </span>
              </div>

              {/* Loading Skeleton in calculation box */}
              {uiState === 'loading' ? (
                <div className="space-y-3 py-4 animate-pulse">
                  <div className="h-4 bg-[#e7e3ca] rounded"></div>
                  <div className="h-4 bg-[#e7e3ca] rounded"></div>
                  <div className="h-4 bg-[#e7e3ca] rounded"></div>
                  <div className="h-10 bg-[#dda15e]/50 rounded"></div>
                  <p className="text-center font-mono text-[10px] text-[#8f4a00]">
                    Recalculando tarifas DIAN y fletes...
                  </p>
                </div>
              ) : (
                <div className="space-y-2 mt-3 text-xs font-mono text-[#544438]">
                  <div className="flex justify-between">
                    <span>Subtotal Mercancía ({totalBoxes} Cajas):</span>
                    <strong className="text-[#1d1c0d]">${subtotal.toLocaleString('es-CO')} COP</strong>
                  </div>

                  <div className="flex justify-between text-emerald-800">
                    <span>Descuento Mayorista (5% Pronto Pago):</span>
                    <strong>-${discount.toLocaleString('es-CO')} COP</strong>
                  </div>

                  <div className="flex justify-between pt-1 border-t border-[#bc6c25]/20">
                    <span>Base Gravable Neta:</span>
                    <strong>${baseGravable.toLocaleString('es-CO')} COP</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>IVA Agroindustrial (19%):</span>
                    <strong>+${iva.toLocaleString('es-CO')} COP</strong>
                  </div>

                  <div className="flex justify-between text-[#8f4a00]">
                    <span>ReteFuente Estimada (2.5%):</span>
                    <strong>-${reteFuente.toLocaleString('es-CO')} COP</strong>
                  </div>

                  {/* Grand Total Box */}
                  <div className="bg-[#283618] text-[#fefae0] p-3 rounded border border-[#dda15e] mt-4 retro-shadow-sm">
                    <span className="text-[10px] font-mono text-[#dda15e] uppercase tracking-wider block">
                      TOTAL NETO A FACTURAR
                    </span>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-white my-0.5">
                      ${totalNeto.toLocaleString('es-CO')} COP
                    </div>
                    <span className="text-[10px] font-sans text-stone-300 block">
                      [✓] Crédito comercial pre-aprobado • Plazo de pago: 15 días
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#bc6c25]/30 text-[10px] text-[#544438] font-sans">
              <span className="font-bold text-[#1d1c0d] block">Condiciones de Entrega:</span>
              Furgón climatizado Fábrica La Esperanza, Ruta Vélez-Barbosa-San Gil. Llegada estimada en 4 horas.
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#f4f1de] p-3 sm:p-4 border-t-2 border-[#bc6c25] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              className="bg-[#fefae0] hover:bg-white text-[#1d1c0d] px-3 py-1.5 rounded border border-[#bc6c25] font-mono flex items-center gap-1.5 retro-shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#8f4a00]" />
              <span>Guardar Borrador en Sesión</span>
            </button>
            <button
              onClick={() => {
                setCart([]);
                showToast('Selección de productos limpiada.');
              }}
              className="text-[#9a031e] hover:underline px-2 py-1 text-[11px]"
            >
              Limpiar Selección
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setStep(1)}
              className="px-3 py-1.5 bg-[#ede9cf] hover:bg-[#e0dbc0] text-[#1d1c0d] rounded font-sans flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Paso Anterior</span>
            </button>

            <button
              onClick={handleConfirmOrder}
              className="bg-[#bc6c25] hover:bg-[#8f4a00] text-white px-4 py-2 rounded font-bold font-sans flex items-center gap-1.5 retro-shadow retro-press border border-[#dda15e] transition-colors text-xs"
            >
              <span>Confirmar y Facturar</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dda15e]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
