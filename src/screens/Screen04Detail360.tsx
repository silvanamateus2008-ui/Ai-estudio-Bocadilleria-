import React, { useState } from 'react';
import { ScreenId, UIState } from '../types';
import { IMAGES } from '../data/domainData';
import { StateControlBar } from '../components/StateControlBar';
import { 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Truck, 
  CreditCard, 
  Building2, 
  AlertTriangle, 
  FolderPlus, 
  ChevronRight,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

interface Screen04Detail360Props {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string) => void;
}

export const Screen04Detail360: React.FC<Screen04Detail360Props> = ({ onNavigate, showToast }) => {
  const [uiState, setUiState] = useState<UIState>('normal');
  const [activeTab, setActiveTab] = useState<'info' | 'lotes' | 'pagos' | 'adjuntos'>('info');

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#bc6c25]/40 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-[#544438]">
          <button onClick={() => onNavigate('SCR-02')} className="hover:text-[#8f4a00]">
            Dashboard
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate('SCR-02')} className="hover:text-[#8f4a00]">
            Facturación Histórica
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#8f4a00] font-bold">FACT-2026-8942</span>
        </div>

        <span className="text-[10px] text-[#283618] bg-[#d7e9bd] px-2 py-0.5 rounded font-bold border border-[#283618]/20">
          CUFE DIAN: 894a-39b2-c01e-7819-velez
        </span>
      </div>

      {/* State Simulator */}
      <StateControlBar
        currentState={uiState}
        onSelectState={setUiState}
        onTriggerToast={() =>
          showToast('✓ Comprobante PDF Generado: Listo para descarga o envío por valija.')
        }
        screenCode="SCR-04"
      />

      {/* Error Alert Banner */}
      {uiState === 'error' && (
        <div className="bg-[#ffdad6] border-[2px] border-[#9a031e] text-[#9a031e] p-3.5 rounded flex items-center justify-between gap-3 retro-shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <strong className="block font-bold">Aviso de Infraestructura Contable:</strong>
              El servidor de transacciones Payara 7 Micro-Cluster #4 no responde a la validación remota DIAN. Se emitirá documento de contingencia fiscal tipo B.
            </div>
          </div>
          <button
            onClick={() => setUiState('normal')}
            className="bg-[#9a031e] text-white text-xs px-3 py-1 rounded font-bold hover:bg-[#800010] transition-colors shrink-0"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Master Dossier Header */}
      <div className="bg-[#f4f1de] border-[3px] border-[#bc6c25] rounded p-4 sm:p-6 retro-shadow relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#283618] text-[#dda15e] text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                EXPEDIENTE COMERCIAL // VÉLEZ SANTANDER
              </span>
              <span className="text-[10px] font-mono text-[#544438]">
                TURNO PAILA #2 • GUAVATÁ
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d1c0d] flex items-center gap-3">
              <span>Expediente: FACT-2026-8942</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-sans text-[#544438]">
              <span className="font-bold text-[#1d1c0d] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#8f4a00]" />
                Distribuidora Dulces del Fonce S.A.S.
              </span>
              <span>•</span>
              <span className="font-mono">NIT: 890.102.948-1</span>
              <span>•</span>
              <span>San Gil, Santander</span>
            </div>
          </div>

          {/* Authentic Slanted Vintage Rubber Stamp */}
          <div className="flex items-center gap-3">
            <div className="transform -rotate-3 bg-[#fefae0] border-3 border-double border-emerald-700 text-emerald-800 px-4 py-2 rounded text-center retro-shadow-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest block font-bold">
                REVISIÓN FISCAL
              </span>
              <span className="font-serif text-sm sm:text-base font-extrabold tracking-wider">
                [✓] COMPLETADO & FACTURADO
              </span>
              <span className="text-[8px] font-mono block text-[#283618]">
                14-OCT-2026 • SELLO DE PLANTA
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => showToast('Generando comprobante fiscal PDF para Distribuidora Dulces del Fonce...')}
                className="bg-[#283618] hover:bg-[#1b2413] text-[#fefae0] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 retro-shadow-sm transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#dda15e]" />
                <span>Imprimir PDF</span>
              </button>
              <button
                onClick={() => onNavigate('SCR-05')}
                className="bg-[#bc6c25] hover:bg-[#8f4a00] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 retro-shadow-sm transition-colors"
              >
                <span>+ Nueva Transacción</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Split 2-Column Dossier Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Tabs & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded retro-shadow overflow-hidden">
            <div className="bg-[#f4f1de] border-b-2 border-[#bc6c25] px-3 pt-2 flex items-center gap-1 overflow-x-auto text-xs font-sans">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-3 py-1.5 rounded-t transition-all font-semibold ${
                  activeTab === 'info'
                    ? 'bg-[#fefae0] text-[#8f4a00] border-t-2 border-l-2 border-r-2 border-[#bc6c25] font-bold'
                    : 'text-[#544438] hover:text-[#1d1c0d]'
                }`}
              >
                Información General
              </button>
              <button
                onClick={() => setActiveTab('lotes')}
                className={`px-3 py-1.5 rounded-t transition-all font-semibold ${
                  activeTab === 'lotes'
                    ? 'bg-[#fefae0] text-[#8f4a00] border-t-2 border-l-2 border-r-2 border-[#bc6c25] font-bold'
                    : 'text-[#544438] hover:text-[#1d1c0d]'
                }`}
              >
                Historial de Lote & Paila
              </button>
              <button
                onClick={() => setActiveTab('pagos')}
                className={`px-3 py-1.5 rounded-t transition-all font-semibold ${
                  activeTab === 'pagos'
                    ? 'bg-[#fefae0] text-[#8f4a00] border-t-2 border-l-2 border-r-2 border-[#bc6c25] font-bold'
                    : 'text-[#544438] hover:text-[#1d1c0d]'
                }`}
              >
                Facturación & Pagos
              </button>
              <button
                onClick={() => setActiveTab('adjuntos')}
                className={`px-3 py-1.5 rounded-t transition-all font-semibold ${
                  activeTab === 'adjuntos'
                    ? 'bg-[#fefae0] text-[#8f4a00] border-t-2 border-l-2 border-r-2 border-[#bc6c25] font-bold'
                    : 'text-[#544438] hover:text-[#1d1c0d]'
                }`}
              >
                Documentos Adjuntos (0)
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-5 bg-white">
              {activeTab === 'adjuntos' || uiState === 'empty' ? (
                /* Empty State in Tab */
                <div className="py-10 text-center bg-[#fefae0] rounded border border-[#bc6c25]/40">
                  <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-[#f4f1de] border-2 border-[#bc6c25] flex items-center justify-center text-[#8f4a00]">
                    <FolderPlus className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1d1c0d]">
                    Sin Archivos Digitales Adjuntos
                  </h4>
                  <p className="text-xs text-[#544438] max-w-sm mx-auto mt-1 mb-4 font-sans">
                    No se han cargado copias digitalizadas de la remisión física firmada por el transportador ni comprobantes bancarios adicionales.
                  </p>
                  <button
                    onClick={() => showToast('Abriendo selector de archivos para remisión escaneada...')}
                    className="bg-[#283618] hover:bg-[#1b2413] text-[#fefae0] text-xs px-3.5 py-1.5 rounded font-bold transition-colors"
                  >
                    + Subir Documento Escaneado
                  </button>
                </div>
              ) : activeTab === 'info' ? (
                /* Information Tab */
                <div className="space-y-5">
                  {/* Key Value Ledger */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#f4f1de] p-3.5 rounded border border-[#bc6c25]">
                    <div>
                      <span className="text-[10px] font-mono text-[#544438] block uppercase">
                        CLIENTE MAYORISTA
                      </span>
                      <strong className="text-[#1d1c0d] font-serif text-sm">
                        Distribuidora Dulces del Fonce S.A.S.
                      </strong>
                      <span className="text-[10px] text-[#544438] block">
                        San Gil, Santander • Cra 11 # 8-42
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#544438] block uppercase">
                        DOCUMENTO FISCAL DIAN
                      </span>
                      <strong className="text-[#8f4a00] font-mono text-sm">
                        FACT-88412 (Res. 18764028)
                      </strong>
                      <span className="text-[10px] text-[#544438] block">
                        Habilitado para Factura Electrónica
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#544438] block uppercase">
                        FECHA Y HORA DE EMISIÓN
                      </span>
                      <span className="font-mono text-[#1d1c0d]">
                        14 de Octubre, 2026 • 09:42 AM
                      </span>
                      <span className="text-[10px] text-[#544438] block">
                        Turno Mañana Paila #2
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#544438] block uppercase">
                        CONDICIÓN COMERCIAL
                      </span>
                      <span className="font-mono text-emerald-800 font-bold">
                        5% Pronto Pago Mayorista
                      </span>
                      <span className="text-[10px] text-[#544438] block">
                        Convenio Anual #044-B
                      </span>
                    </div>
                  </div>

                  {/* Grand Total Box */}
                  <div className="bg-[#fefae0] p-4 rounded border-2 border-[#bc6c25] flex flex-col sm:flex-row sm:items-center justify-between gap-3 retro-shadow-sm">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
                        LIQUIDACIÓN MONETARIA (COP)
                      </span>
                      <div className="font-serif text-2xl font-bold text-[#1d1c0d]">
                        $1.850.000 COP
                      </div>
                      <span className="text-[11px] text-[#544438]">
                        Base: $1.554.622 • IVA 19%: $295.378 COP
                      </span>
                    </div>

                    <div className="bg-[#283618] text-[#dda15e] p-2 rounded text-xs font-mono text-right border border-[#dda15e]">
                      <span className="block text-[10px] uppercase">ESTADO DE PAGO</span>
                      <strong className="text-white text-sm">PAGADO TOTAL</strong>
                      <span className="block text-[9px] text-stone-300">Bancolombia BC-994102</span>
                    </div>
                  </div>

                  {/* Itemized Table */}
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1d1c0d] mb-2">
                      Detalle de Bocadillo Despachado
                    </h4>
                    <div className="border border-[#bc6c25] rounded overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#283618] text-[#fefae0] font-mono text-[10px] uppercase">
                          <tr>
                            <th className="p-2">Ítem / Lote</th>
                            <th className="p-2">Presentación</th>
                            <th className="p-2 text-center">Cant.</th>
                            <th className="p-2 text-right">Precio Un.</th>
                            <th className="p-2 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#bc6c25]/30">
                          <tr>
                            <td className="p-2">
                              <div className="font-bold text-[#1d1c0d]">BOC-101</div>
                              <div className="text-[10px] text-[#8f4a00] font-mono">
                                Lote #TAN-883 (Paila Guavatá)
                              </div>
                            </td>
                            <td className="p-2">Bocadillo Veleño Lonja Hoja x 500g</td>
                            <td className="p-2 text-center font-mono font-bold">50 cajas</td>
                            <td className="p-2 text-right font-mono">$18.000</td>
                            <td className="p-2 text-right font-mono font-bold">$900.000 COP</td>
                          </tr>
                          <tr>
                            <td className="p-2">
                              <div className="font-bold text-[#1d1c0d]">BOC-102</div>
                              <div className="text-[10px] text-[#8f4a00] font-mono">
                                Lote #TAN-879 (Barbosa)
                              </div>
                            </td>
                            <td className="p-2">Combinado Guayaba-Arequipe Caja x 24</td>
                            <td className="p-2 text-center font-mono font-bold">50 cajas</td>
                            <td className="p-2 text-right font-mono">$19.000</td>
                            <td className="p-2 text-right font-mono font-bold">$950.000 COP</td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-[#f4f1de] font-mono font-bold text-[#1d1c0d]">
                          <tr>
                            <td colSpan={4} className="p-2 text-right">
                              Subtotal Bruto:
                            </td>
                            <td className="p-2 text-right">$1.850.000 COP</td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="p-2 text-right text-emerald-800">
                              Descuento Pronto Pago (-5%):
                            </td>
                            <td className="p-2 text-right text-emerald-800">-$92.500 COP</td>
                          </tr>
                          <tr className="bg-[#283618] text-[#fefae0]">
                            <td colSpan={4} className="p-2 text-right font-serif text-sm">
                              TOTAL NETO COBRADO:
                            </td>
                            <td className="p-2 text-right font-serif text-sm text-[#dda15e]">
                              $1.757.500 COP
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Guava Provenance Certificate Box */}
                  <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] flex items-start gap-3">
                    <img
                      src={IMAGES.lonjaBijao}
                      alt="Hoja de Bijao"
                      className="w-12 h-12 rounded object-cover border border-[#bc6c25] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-[#544438]">
                      <strong className="text-[#1d1c0d] font-serif block">
                        Certificado de Trazabilidad Agroindustrial
                      </strong>
                      Guayaba cosechada en fincas de Vélez y Guavatá a 2.100 m.s.n.m. Enfriada en artesas de madera de nogal y empacada en hojas de bijao curadas al vapor bajo registro INVIMA RSA-001928-2022.
                    </div>
                  </div>
                </div>
              ) : (
                /* Secondary tabs */
                <div className="p-4 text-xs font-mono text-[#544438]">
                  <p>Información complementaria del expediente FACT-2026-8942.</p>
                  <p className="mt-2 text-[#8f4a00]">
                    Paila: Guavatá #2 • Registro Payara: txn_984210 • MySQL ID: 88412
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Gauge & Live Activity Timeline */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quality Compliance Circular Gauge Card */}
          <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded p-4 retro-shadow">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#bc6c25]/30">
              <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
                AUDITORÍA DE CALIDAD
              </span>
              <Award className="w-4 h-4 text-[#bc6c25]" />
            </div>

            {/* Circular Gauge SVG */}
            {uiState === 'loading' ? (
              <div className="py-6 flex flex-col items-center justify-center animate-pulse">
                <div className="w-24 h-24 rounded-full border-4 border-[#e7e3ca] border-t-[#bc6c25]"></div>
                <span className="text-xs font-mono text-[#8f4a00] mt-3">
                  Verificando parámetros...
                </span>
              </div>
            ) : (
              <div className="text-center py-2">
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f4f1de"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#283618"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="5.0"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-[#1d1c0d]">
                      98%
                    </span>
                    <span className="text-[9px] font-mono text-[#283618] font-bold">
                      CONFORME
                    </span>
                  </div>
                </div>

                <div className="mt-3 font-serif font-bold text-xs text-[#1d1c0d]">
                  Puntaje de Cumplimiento: 98/100
                </div>
                <p className="text-[11px] text-[#544438] mt-0.5">
                  Cumple al 100% estándar de humedad, azúcar (75° Brix) y empaque en hoja de bijao.
                </p>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-[#bc6c25]/30 space-y-1 text-[10px] font-mono text-[#544438]">
              <div className="flex justify-between">
                <span>Puntualidad Despacho:</span>
                <strong className="text-emerald-800">100%</strong>
              </div>
              <div className="flex justify-between">
                <span>Calidad Bijao & Sello:</span>
                <strong className="text-emerald-800">99.4%</strong>
              </div>
              <div className="flex justify-between">
                <span>Fidelización Distribuidor:</span>
                <strong className="text-[#8f4a00]">Nivel Oro</strong>
              </div>
            </div>
          </div>

          {/* Live Vertical Activity Timeline */}
          <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-4 retro-shadow">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#bc6c25]/30">
              <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
                TIMELINE DE DESPACHO
              </span>
              <Clock className="w-3.5 h-3.5 text-[#8f4a00]" />
            </div>

            <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#bc6c25]/40 text-xs">
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#283618] border border-[#fefae0]"></div>
                <span className="text-[10px] font-mono text-[#8f4a00] block">
                  14 Oct, 07:15 AM
                </span>
                <strong className="text-[#1d1c0d] block">Orden Recibida y Verificada</strong>
                <p className="text-[10px] text-[#544438]">
                  Don Carlos Ruiz valida disponibilidad de 100 cajas en bodega.
                </p>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#283618] border border-[#fefae0]"></div>
                <span className="text-[10px] font-mono text-[#8f4a00] block">
                  14 Oct, 08:30 AM
                </span>
                <strong className="text-[#1d1c0d] block">Pago Confirmado Bancolombia</strong>
                <p className="text-[10px] text-[#544438]">
                  Transferencia verificada vía webhook en Payara Server 7.x.
                </p>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#283618] border border-[#fefae0]"></div>
                <span className="text-[10px] font-mono text-[#8f4a00] block">
                  14 Oct, 09:00 AM
                </span>
                <strong className="text-[#1d1c0d] block">Empaque Bijao & Sanidad</strong>
                <p className="text-[10px] text-[#544438]">
                  Lotes #TAN-883 y #TAN-879 sellados con cinta de seguridad.
                </p>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 border border-[#fefae0] animate-pulse"></div>
                <span className="text-[10px] font-mono text-emerald-800 font-bold block">
                  14 Oct, 09:42 AM [EN RUTA]
                </span>
                <strong className="text-[#1d1c0d] block">Despacho Camión TermoKing</strong>
                <p className="text-[10px] text-[#544438]">
                  Conductor Héctor Fabio Celis (Placa TR-7729) rumbo a San Gil.
                </p>
              </div>

              {/* Event 5 */}
              <div className="relative">
                <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#bc6c25] border border-[#fefae0]"></div>
                <span className="text-[10px] font-mono text-[#544438] block">
                  14 Oct, 10:15 AM
                </span>
                <strong className="text-[#1d1c0d] block">Factura Archivada en DIAN</strong>
                <p className="text-[10px] text-[#544438]">
                  Copia contable generada y almacenada en libro mayor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
