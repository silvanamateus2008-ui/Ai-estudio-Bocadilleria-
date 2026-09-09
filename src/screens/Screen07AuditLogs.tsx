import React, { useState } from 'react';
import { ScreenId, UIState, AuditLogItem } from '../types';
import { AUDIT_LOGS_DATA, IMAGES } from '../data/domainData';
import { StateControlBar } from '../components/StateControlBar';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Printer, 
  Terminal, 
  Flame, 
  Thermometer, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Database,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Screen07AuditLogsProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string) => void;
}

export const Screen07AuditLogs: React.FC<Screen07AuditLogsProps> = ({
  onNavigate,
  showToast,
}) => {
  const [uiState, setUiState] = useState<UIState>('normal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState('Todas');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [traceLotInput, setTraceLotInput] = useState('#TAN-883');
  const [traceResult, setTraceResult] = useState(true);

  const filteredLogs = AUDIT_LOGS_DATA.filter((log) => {
    const matchesStation = selectedStation === 'Todas' || log.station.includes(selectedStation);
    const matchesLevel = selectedLevel === 'Todos' || log.level === selectedLevel;
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStation && matchesLevel && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Console Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#bc6c25]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#283618] text-[#dda15e] text-[9px] font-mono px-2 py-0.5 rounded font-bold">
              SISTEMA DE SEGURIDAD INDUSTRIAL & TRAZABILIDAD REGIONAL
            </span>
            <span className="text-[10px] font-mono text-[#544438]">
              SHA-256 LEDGER IMMUTABLE // PAYARA 7
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1d1c0d]">
            Bitácora de Auditoría, Pailas y Trazabilidad Agroindustrial
          </h1>
          <p className="text-xs text-[#544438] mt-0.5 font-sans">
            Registro inmutable de pesaje de guayaba, temperatura de cocción, sellado de hoja de bijao y validaciones transaccionales Payara 7.x.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              showToast('✓ Acta de Auditoría y Trazabilidad exportada con firma digital SHA-256.')
            }
            className="bg-[#283618] hover:bg-[#1b2413] text-[#dda15e] px-3 py-1.5 rounded text-xs font-bold font-sans flex items-center gap-1.5 retro-shadow retro-press border border-[#dda15e] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON Certificado</span>
          </button>
        </div>
      </div>

      {/* State Simulator Bar */}
      <StateControlBar
        currentState={uiState}
        onSelectState={setUiState}
        onTriggerToast={() =>
          showToast('✓ Acta de Auditoría y Trazabilidad exportada con firma digital SHA-256.')
        }
        screenCode="SCR-07"
      />

      {/* Error Alert Banner */}
      {uiState === 'error' && (
        <div className="bg-[#ffdad6] border-[2px] border-[#9a031e] text-[#9a031e] p-3.5 rounded flex items-center justify-between gap-3 retro-shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <strong className="block font-bold">Alerta de Integridad Criptográfica:</strong>
              Discrepancia detectada en bloque #8841-B: La firma del sensor Paila #2 difiere del valor esperado en el ledger distribuido (Diff: 0.02%). Lote puesto en cuarentena preventiva.
            </div>
          </div>
          <button
            onClick={() => setUiState('normal')}
            className="bg-[#9a031e] text-white text-xs px-3 py-1 rounded font-bold hover:bg-[#800010] transition-colors shrink-0"
          >
            Verificar Hash
          </button>
        </div>
      )}

      {/* 4 Quick Stat Metric Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3 rounded retro-shadow-sm">
          <span className="text-[9px] font-mono uppercase text-[#8f4a00] font-bold block">
            EVENTOS HOY
          </span>
          <strong className="font-serif text-xl font-bold text-[#1d1c0d]">142</strong>
          <span className="text-[10px] text-[#544438] block mt-0.5">Sin incidentes</span>
        </div>

        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3 rounded retro-shadow-sm">
          <span className="text-[9px] font-mono uppercase text-[#8f4a00] font-bold block">
            PAILAS EN COCCIÓN
          </span>
          <strong className="font-serif text-xl font-bold text-[#8f4a00]">04</strong>
          <span className="text-[10px] text-[#544438] block mt-0.5">75° Brix promedio</span>
        </div>

        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3 rounded retro-shadow-sm">
          <span className="text-[9px] font-mono uppercase text-[#8f4a00] font-bold block">
            INTEGRIDAD CADENA
          </span>
          <strong className="font-serif text-xl font-bold text-emerald-800">100%</strong>
          <span className="text-[10px] text-[#544438] block mt-0.5">SHA-256 Validado</span>
        </div>

        <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3 rounded retro-shadow-sm">
          <span className="text-[9px] font-mono uppercase text-[#8f4a00] font-bold block">
            ALERTAS CRÍTICAS
          </span>
          <strong className="font-serif text-xl font-bold text-[#283618]">00</strong>
          <span className="text-[10px] text-[#544438] block mt-0.5">Rango normal</span>
        </div>
      </div>

      {/* Live Sensors & Kettle Telemetry */}
      <div className="bg-[#f4f1de] border-[3px] border-[#bc6c25] rounded p-4 sm:p-5 retro-shadow">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#bc6c25]/30">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#bc6c25]" />
            <h3 className="font-serif text-base font-bold text-[#1d1c0d]">
              Monitoreo Térmico & Sensores de Pailas en Vivo
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#283618] bg-[#d7e9bd] px-2 py-0.5 rounded font-bold border border-[#283618]/30">
            ● Transmisión Modbus / RS-485 Activa
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {/* Sensor 1 */}
          <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
            <div className="flex justify-between items-center text-[#8f4a00] font-bold mb-1">
              <span>PAILA #1 (Chipatá)</span>
              <span className="bg-[#dda15e]/30 px-1.5 py-0.2 rounded text-[10px]">Cobre 500L</span>
            </div>
            <div className="flex items-baseline justify-between my-1">
              <span className="text-xl font-bold text-[#1d1c0d]">74.8° Brix</span>
              <span className="text-emerald-800 font-bold">102.4°C</span>
            </div>
            <div className="w-full bg-[#f4f1de] h-1.5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#bc6c25] w-[95%]"></div>
            </div>
            <div className="text-[10px] text-[#544438] flex justify-between">
              <span>Estado: Cocción Final</span>
              <span>Pailero: C. Ruiz</span>
            </div>
          </div>

          {/* Sensor 2 */}
          <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
            <div className="flex justify-between items-center text-[#8f4a00] font-bold mb-1">
              <span>PAILA #2 (Guavatá)</span>
              <span className="bg-[#dda15e]/30 px-1.5 py-0.2 rounded text-[10px]">Cobre 500L</span>
            </div>
            <div className="flex items-baseline justify-between my-1">
              <span className="text-xl font-bold text-[#1d1c0d]">72.1° Brix</span>
              <span className="text-emerald-800 font-bold">98.2°C</span>
            </div>
            <div className="w-full bg-[#f4f1de] h-1.5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#bc6c25] w-[82%]"></div>
            </div>
            <div className="text-[10px] text-[#544438] flex justify-between">
              <span>Estado: Concentración</span>
              <span>Pailero: J. Gómez</span>
            </div>
          </div>

          {/* Sensor 3 */}
          <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
            <div className="flex justify-between items-center text-[#283618] font-bold mb-1">
              <span>MESA #4 (Empaque)</span>
              <span className="bg-[#d7e9bd] px-1.5 py-0.2 rounded text-[10px]">Hoja Bijao</span>
            </div>
            <div className="flex items-baseline justify-between my-1">
              <span className="text-xl font-bold text-[#1d1c0d]">14.2% Hum</span>
              <span className="text-emerald-800 font-bold">24°C</span>
            </div>
            <div className="w-full bg-[#f4f1de] h-1.5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#283618] w-[45%]"></div>
            </div>
            <div className="text-[10px] text-[#544438] flex justify-between">
              <span>Estado: Envoltura</span>
              <span>Operarias: 4 Activas</span>
            </div>
          </div>

          {/* Sensor 4 */}
          <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
            <div className="flex justify-between items-center text-[#283618] font-bold mb-1">
              <span>CÁMARA FRÍA #1</span>
              <span className="bg-[#d7e9bd] px-1.5 py-0.2 rounded text-[10px]">Bodega</span>
            </div>
            <div className="flex items-baseline justify-between my-1">
              <span className="text-xl font-bold text-[#1d1c0d]">16.5°C</span>
              <span className="text-emerald-800 font-bold">48 Lotes</span>
            </div>
            <div className="w-full bg-[#f4f1de] h-1.5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#283618] w-[88%]"></div>
            </div>
            <div className="text-[10px] text-[#544438] flex justify-between">
              <span>Estado: Estiba</span>
              <span>Despachos: Listo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lot Traceability Explorer Box */}
      <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded p-4 retro-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#bc6c25]/30">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
              TRAZABILIDAD DE ORIGEN VELEÑO (END-TO-END)
            </span>
            <h4 className="font-serif text-sm font-bold text-[#1d1c0d]">
              Rastrear Lote de Bocadillo desde la Finca hasta el Despacho
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={traceLotInput}
              onChange={(e) => setTraceLotInput(e.target.value)}
              placeholder="#TAN-883"
              className="px-2.5 py-1 text-xs font-mono bg-white border border-[#bc6c25] rounded text-[#1d1c0d] w-36"
            />
            <button
              onClick={() => {
                showToast(`Rastreando genealogía completa del lote ${traceLotInput}...`);
                setTraceResult(true);
              }}
              className="bg-[#283618] hover:bg-[#1b2413] text-[#dda15e] px-3 py-1 rounded text-xs font-mono font-bold"
            >
              Consultar Árbol
            </button>
          </div>
        </div>

        {traceResult && (
          <div className="mt-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-sans">
              <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25]">
                <div className="flex items-center gap-1.5 text-[#8f4a00] font-mono font-bold text-[10px] mb-1">
                  <span>1. FINCA GUAVATÁ</span>
                  <span>(12 Oct, 06:00)</span>
                </div>
                <strong className="text-[#1d1c0d] block">Cosecha Guayaba Regional</strong>
                <p className="text-[10px] text-[#544438] mt-0.5">
                  1.200 kg guayaba roja madurada en árbol. Productor: Don Efraín Morales.
                </p>
              </div>

              <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25]">
                <div className="flex items-center gap-1.5 text-[#8f4a00] font-mono font-bold text-[10px] mb-1">
                  <span>2. PAILA COBRE #2</span>
                  <span>(13 Oct, 08:30)</span>
                </div>
                <strong className="text-[#1d1c0d] block">Molienda & Concentrado</strong>
                <p className="text-[10px] text-[#544438] mt-0.5">
                  Punto de jalea alcanzado a 75° Brix con panela de Hoya del Río Suárez.
                </p>
              </div>

              <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25]">
                <div className="flex items-center gap-1.5 text-[#283618] font-mono font-bold text-[10px] mb-1">
                  <span>3. TALLER BIJAO</span>
                  <span>(13 Oct, 16:00)</span>
                </div>
                <strong className="text-[#1d1c0d] block">Corte & Empaque Manual</strong>
                <p className="text-[10px] text-[#544438] mt-0.5">
                  500 lonjas envueltas en hojas esterilizadas. Lote #TAN-883 estampado.
                </p>
              </div>

              <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25]">
                <div className="flex items-center gap-1.5 text-[#283618] font-mono font-bold text-[10px] mb-1">
                  <span>4. FACT-2026-8942</span>
                  <span>(14 Oct, 09:42)</span>
                </div>
                <strong className="text-[#1d1c0d] block">Despacho Mayorista</strong>
                <p className="text-[10px] text-[#544438] mt-0.5">
                  Camión TR-7729 hacia Distribuidora Dulces del Fonce (San Gil).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Immutable Audit Log Table */}
      <div className="bg-[#fefae0] border-[3px] border-[#bc6c25] rounded retro-shadow overflow-hidden">
        {/* Table Filter Controls */}
        <div className="bg-[#f4f1de] p-3.5 border-b-2 border-[#bc6c25] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Filtrar por hash, operador o estación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-[#fefae0] border border-[#bc6c25] rounded font-mono text-[#1d1c0d]"
              />
              <Search className="w-3.5 h-3.5 text-[#8f4a00] absolute left-2.5 top-2" />
            </div>

            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="text-xs bg-[#fefae0] border border-[#bc6c25] rounded px-2 py-1 text-[#1d1c0d] font-sans"
            >
              <option value="Todas">Todas las Estaciones</option>
              <option value="Molienda">Molienda & Acopio</option>
              <option value="Pailas">Calderas & Pailas</option>
              <option value="Empaque">Empaque Bijao</option>
              <option value="Despacho">Despacho Camiones</option>
              <option value="Transacción">Transacción DIAN</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#544438]">
              Registros: <strong>{filteredLogs.length}</strong>
            </span>
          </div>
        </div>

        {/* Empty State */}
        {uiState === 'empty' || filteredLogs.length === 0 ? (
          <div className="p-8 text-center bg-[#fefae0]">
            <Terminal className="w-12 h-12 mx-auto text-[#bc6c25] mb-2" />
            <h4 className="font-serif text-base font-bold text-[#1d1c0d]">
              No hay registros que coincidan
            </h4>
            <p className="text-xs text-[#544438] max-w-sm mx-auto mt-1 mb-4 font-sans">
              No se encontraron eventos de auditoría para los criterios de filtro especificados.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStation('Todas');
                setUiState('normal');
              }}
              className="bg-[#bc6c25] text-white text-xs px-3 py-1.5 rounded font-bold"
            >
              Restablecer Filtros de Bitácora
            </button>
          </div>
        ) : (
          /* Table Content */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#283618] text-[#fefae0] text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Hora / Evento</th>
                  <th className="p-3">Nivel</th>
                  <th className="p-3">Estación Agroindustrial</th>
                  <th className="p-3 font-sans">Descripción del Suceso</th>
                  <th className="p-3 font-sans">Operador Responsable</th>
                  <th className="p-3">Hash SHA-256</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bc6c25]/30 bg-white">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#fefae0]/80 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#1d1c0d]">{log.timestamp}</div>
                      <div className="text-[10px] text-[#8f4a00]">{log.code}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.level === 'ÉXITO'
                            ? 'bg-[#d7e9bd] text-[#283618]'
                            : log.level === 'INFO'
                            ? 'bg-[#dda15e]/30 text-[#8f4a00]'
                            : 'bg-[#ffdad6] text-[#9a031e]'
                        }`}
                      >
                        {log.level}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="bg-[#f4f1de] border border-[#bc6c25]/40 text-[#544438] px-2 py-0.5 rounded text-[10px]">
                        {log.station}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-[#1d1c0d] max-w-xs">
                      {log.description}
                    </td>
                    <td className="p-3 font-sans text-[#544438]">
                      {log.operator}
                    </td>
                    <td className="p-3 font-mono text-[10px] text-[#8f4a00]">
                      <span className="hover:underline cursor-pointer" title="Firma Criptográfica SHA-256">
                        {log.hash}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-[#f4f1de] border-t border-[#bc6c25] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#544438]">
          <span>
            Verificación de integridad: <strong>VÁLIDA ✓</strong> • Bloque génesis: 1994-VELEZ-ESPERANZA
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Generando acta oficial de cierre de turno en PDF...')}
              className="px-2.5 py-1 bg-[#fefae0] hover:bg-white text-[#1d1c0d] rounded border border-[#bc6c25] flex items-center gap-1 text-[11px]"
            >
              <Printer className="w-3 h-3 text-[#8f4a00]" />
              <span>Imprimir Acta de Turno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
