import React, { useState } from 'react';
import { ScreenId, UIState, ProductItem } from '../types';
import { PRODUCTS_DATA, IMAGES } from '../data/domainData';
import { StateControlBar } from '../components/StateControlBar';
import { 
  Package, 
  Search, 
  Plus, 
  Download, 
  LayoutList, 
  Kanban, 
  AlertOctagon, 
  Copy, 
  Trash2, 
  Edit3, 
  Filter, 
  Flame,
  CheckCircle2,
  Boxes
} from 'lucide-react';

interface Screen03CatalogProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string) => void;
}

export const Screen03Catalog: React.FC<Screen03CatalogProps> = ({ onNavigate, showToast }) => {
  const [uiState, setUiState] = useState<UIState>('normal');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [productsList, setProductsList] = useState<ProductItem[]>(PRODUCTS_DATA);

  const filteredProducts = productsList.filter((prod) => {
    const matchesCategory = categoryFilter === 'Todas' || prod.category === categoryFilter;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.lotCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDuplicate = (sku: string) => {
    showToast(`✓ Producto ${sku} duplicado con éxito en el catálogo de planta.`);
  };

  const handleDelete = (sku: string) => {
    setUiState('error');
    showToast(`✕ Acción denegada para ${sku}: Referencia asociada a facturación.`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#bc6c25]">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder="Filtrar por SKU, nombre o lote (#TAN-883)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fefae0] border border-[#bc6c25] rounded font-sans text-[#1d1c0d] focus:outline-hidden focus:border-[#283618]"
            />
            <Search className="w-3.5 h-3.5 text-[#8f4a00] absolute left-2.5 top-2.5" />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-[#fefae0] border border-[#bc6c25] rounded px-2.5 py-1.5 text-[#1d1c0d] font-sans"
          >
            <option value="Todas">Todas las Categorías</option>
            <option value="Tradicionales">Tradicionales</option>
            <option value="Especiales">Especiales</option>
            <option value="Gourmet">Gourmet</option>
            <option value="Industrial">Industrial</option>
            <option value="Confitería">Confitería</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="bg-[#f4f1de] p-0.5 rounded border border-[#bc6c25] flex items-center">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-sans ${
                viewMode === 'table'
                  ? 'bg-[#283618] text-[#fefae0] font-bold retro-shadow-sm'
                  : 'text-[#544438] hover:text-[#1d1c0d]'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Tabla</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-sans ${
                viewMode === 'kanban'
                  ? 'bg-[#283618] text-[#fefae0] font-bold retro-shadow-sm'
                  : 'text-[#544438] hover:text-[#1d1c0d]'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          <button
            onClick={() => showToast('Abriendo formulario de nueva formulación artesanal...')}
            className="bg-[#bc6c25] hover:bg-[#8f4a00] text-[#fefae0] px-3.5 py-1.5 rounded text-xs font-bold font-sans flex items-center gap-1.5 retro-shadow retro-press border border-[#dda15e] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* State Control Bar */}
      <StateControlBar
        currentState={uiState}
        onSelectState={setUiState}
        onTriggerToast={() =>
          showToast('✓ Producto BOC-101 duplicado con éxito en el catálogo.')
        }
        screenCode="SCR-03"
      />

      {/* Error Alert Banner */}
      {uiState === 'error' && (
        <div className="bg-[#ffdad6] border-[2px] border-[#9a031e] text-[#9a031e] p-3.5 rounded flex items-center justify-between gap-3 retro-shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <strong className="block font-bold">Acción Denegada en Lote Activo:</strong>
              ✕ No se pudo eliminar el registro seleccionado. La referencia está asociada a un despacho y factura de venta activa (#FAC-2024-819 en Payara 7).
            </div>
          </div>
          <button
            onClick={() => setUiState('normal')}
            className="bg-[#9a031e] text-white text-xs px-3 py-1 rounded font-bold hover:bg-[#800010] transition-colors shrink-0"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Header & Archival Metadata */}
      <div className="bg-[#f4f1de] border-[3px] border-[#bc6c25] rounded p-4 sm:p-5 retro-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#283618] text-[#dda15e] text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                REGISTRO DE PLANTA · VÉLEZ SANTANDER
              </span>
              <span className="text-[10px] font-mono text-[#544438]">
                CONTROL DE EXISTENCIAS Y LOTES // KÁRDEX
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1d1c0d]">
              Catálogo de Productos & Referencias de Bocadillo
            </h1>
            <p className="text-xs text-[#544438] max-w-2xl mt-0.5 font-sans">
              Gestión unificada de formulaciones artesanales, empaque tradicional en hoja de bijao, trazabilidad de pailas de guayaba regional y control de disponibilidad para mayoristas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="bg-[#fefae0] p-2 rounded border border-[#bc6c25] text-center min-w-[90px]">
              <span className="text-[9px] text-[#544438] uppercase block">TOTAL REFS</span>
              <strong className="text-[#8f4a00] font-bold text-sm">24</strong>
            </div>
            <div className="bg-[#fefae0] p-2 rounded border border-[#bc6c25] text-center min-w-[90px]">
              <span className="text-[9px] text-[#544438] uppercase block">STOCK CRÍTICO</span>
              <strong className="text-[#9a031e] font-bold text-sm">02</strong>
            </div>
            <div className="bg-[#fefae0] p-2 rounded border border-[#bc6c25] text-center min-w-[90px]">
              <span className="text-[9px] text-[#544438] uppercase block">CAP. BODEGA</span>
              <strong className="text-[#283618] font-bold text-sm">86%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main View: Table vs Kanban */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-[#fefae0] border-[3px] border-[#bc6c25] rounded retro-shadow overflow-hidden">
          {uiState === 'empty' || filteredProducts.length === 0 ? (
            <div className="p-8 text-center bg-[#fefae0]">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f4f1de] border-2 border-[#bc6c25] flex items-center justify-center text-[#8f4a00]">
                <Package className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#1d1c0d]">
                No se encontraron lotes de bocadillo
              </h4>
              <p className="text-xs text-[#544438] max-w-sm mx-auto mt-1 mb-4 font-sans">
                No hay productos que coincidan con la búsqueda o el filtro de categoría seleccionado.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('Todas');
                  setUiState('normal');
                }}
                className="bg-[#bc6c25] text-white text-xs px-3.5 py-1.5 rounded font-bold"
              >
                [ Limpiar Filtros y Restaurar Kárdex ]
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#283618] text-[#fefae0] text-[10px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="p-3">SKU / Código</th>
                    <th className="p-3">Nombre & Presentación</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3 text-right">Precio Mayorista</th>
                    <th className="p-3">Stock en Planta</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Lote Activo</th>
                    <th className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bc6c25]/30 bg-white">
                  {filteredProducts.map((prod, index) => {
                    // Demonstrate Loading Skeleton on Row 2 if state is loading
                    if (uiState === 'loading' && index === 1) {
                      return (
                        <tr key={prod.id} className="animate-pulse bg-[#f4f1de]/60">
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-16"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-48 mb-1"></div>
                            <div className="h-3 bg-[#e7e3ca] rounded w-28"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-20"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-16 ml-auto"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-32"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-20"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-20"></div>
                          </td>
                          <td className="p-3">
                            <div className="h-4 bg-[#e7e3ca] rounded w-16 mx-auto"></div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={prod.id} className="hover:bg-[#fefae0]/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#8f4a00]">
                          {prod.sku}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 rounded border border-[#bc6c25] object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-bold text-[#1d1c0d] font-serif">
                                {prod.name}
                              </div>
                              <div className="text-[10px] text-[#544438] font-sans">
                                {prod.presentation}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="bg-[#f4f1de] border border-[#bc6c25]/40 text-[#544438] px-2 py-0.5 rounded text-[10px] font-mono">
                            {prod.category}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-[#1d1c0d]">
                          ${prod.priceCOP.toLocaleString('es-CO')} COP
                        </td>
                        <td className="p-3">
                          <div className="w-36">
                            <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-[#544438]">
                              <span>{prod.stockBoxes} cajas</span>
                              <span className="font-bold">{prod.stockPercentage}%</span>
                            </div>
                            <div className="w-full bg-[#f4f1de] h-2 rounded-full overflow-hidden border border-[#bc6c25]/40">
                              <div
                                style={{ width: `${prod.stockPercentage}%` }}
                                className={`h-full ${
                                  prod.stockPercentage > 50
                                    ? 'bg-[#283618]'
                                    : prod.stockPercentage > 20
                                    ? 'bg-[#dda15e]'
                                    : 'bg-[#9a031e]'
                                }`}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              prod.status === 'Disponible'
                                ? 'bg-[#d7e9bd] text-[#283618] border border-[#283618]/30'
                                : prod.status === 'Agotándose'
                                ? 'bg-[#dda15e]/30 text-[#8f4a00] border border-[#bc6c25]'
                                : 'bg-[#ffdad6] text-[#9a031e] border border-[#9a031e]'
                            }`}
                          >
                            {prod.status === 'Disponible' ? '✓ ' : prod.status === 'Agotándose' ? '! ' : '✕ '}
                            {prod.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[#544438]">
                          <div>{prod.lotCode}</div>
                          <div className="text-[9px] text-[#8f4a00]">{prod.pailaLocation}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleDuplicate(prod.sku)}
                              className="p-1 text-[#8f4a00] hover:bg-[#dda15e]/20 rounded transition-colors"
                              title="Duplicar referencia"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(prod.sku)}
                              className="p-1 text-[#9a031e] hover:bg-[#ffdad6] rounded transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Ribbon */}
          <div className="p-3 bg-[#f4f1de] border-t border-[#bc6c25] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#544438]">
            <span>
              Mostrando <strong>1 a {filteredProducts.length}</strong> de 24 referencias registradas en kárdex
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Exportando Kárdex en formato CSV...')}
                className="px-2.5 py-1 bg-[#fefae0] hover:bg-white text-[#1d1c0d] rounded border border-[#bc6c25] flex items-center gap-1 text-[11px]"
              >
                <Download className="w-3 h-3 text-[#8f4a00]" />
                <span>Descargar Kárdex (CSV)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1 */}
          <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-3 retro-shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#bc6c25]/30">
              <h4 className="font-serif text-xs font-bold text-[#1d1c0d] uppercase">
                1. Receta & Ajuste
              </h4>
              <span className="bg-[#283618] text-[#dda15e] text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
                1 ref
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8f4a00] mb-1">
                  <span>#LOTE-2026-91</span>
                  <span>Paila #2</span>
                </div>
                <h5 className="font-serif text-xs font-bold text-[#1d1c0d]">
                  Bocadillo con Panela Orgánica
                </h5>
                <p className="text-[10px] text-[#544438] mt-1">
                  Fórmula especial sin azúcar refinada. Ajuste de pectina natural de guayaba.
                </p>
                <div className="mt-2 pt-2 border-t border-[#bc6c25]/20 flex items-center justify-between text-[9px] font-mono text-[#283618]">
                  <span>Materia Prima: 800 kg</span>
                  <span className="font-bold">Turno Tarde</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-3 retro-shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#bc6c25]/30">
              <h4 className="font-serif text-xs font-bold text-[#1d1c0d] uppercase">
                2. Molienda & Cocción
              </h4>
              <span className="bg-[#bc6c25] text-white text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
                3 lotes
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8f4a00] mb-1">
                  <span>#TAN-884</span>
                  <span className="text-[#9a031e] font-bold">75° Brix</span>
                </div>
                <h5 className="font-serif text-xs font-bold text-[#1d1c0d]">
                  Pasta de Guayaba Tumaco
                </h5>
                <p className="text-[10px] text-[#544438] mt-1">
                  Cocción en pailas de cobre con leña certificada de podas de guayabos.
                </p>
                <div className="mt-2 pt-2 border-t border-[#bc6c25]/20 flex items-center justify-between text-[9px] font-mono text-[#283618]">
                  <span>Chipatá: 1.200 kg</span>
                  <span className="font-bold">85% avance</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8f4a00] mb-1">
                  <span>#TAN-885</span>
                  <span>En Caldera</span>
                </div>
                <h5 className="font-serif text-xs font-bold text-[#1d1c0d]">
                  Jalea Roja Concentrada
                </h5>
                <p className="text-[10px] text-[#544438] mt-1">
                  Filtrado fino en tamiz de seda para consistencia cristalina.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-3 retro-shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#bc6c25]/30">
              <h4 className="font-serif text-xs font-bold text-[#1d1c0d] uppercase">
                3. Empaque en Hoja Bijao
              </h4>
              <span className="bg-[#dda15e] text-[#1d1c0d] text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
                4 lotes
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8f4a00] mb-1">
                  <span>#TAN-882</span>
                  <span>Taller Artesanal</span>
                </div>
                <h5 className="font-serif text-xs font-bold text-[#1d1c0d]">
                  Lonja Veleña Auténtica x 500g
                </h5>
                <p className="text-[10px] text-[#544438] mt-1">
                  Envoltura manual con hoja curada de bijao de la ribera del Suárez.
                </p>
                <div className="mt-2 pt-2 border-t border-[#bc6c25]/20 flex items-center justify-between text-[9px] font-mono text-[#283618]">
                  <span>450 unidades</span>
                  <span className="font-bold text-emerald-700">Enfriamiento 14 hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-3 retro-shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#bc6c25]/30">
              <h4 className="font-serif text-xs font-bold text-[#1d1c0d] uppercase">
                4. Listo / Despacho
              </h4>
              <span className="bg-[#283618] text-[#d7e9bd] text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
                6 refs
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-[#bc6c25] retro-shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 mb-1">
                  <span>#TAN-880</span>
                  <span className="bg-[#d7e9bd] px-1 rounded font-bold">✓ Sellado</span>
                </div>
                <h5 className="font-serif text-xs font-bold text-[#1d1c0d]">
                  Caja Surtida Veleña Premium
                </h5>
                <p className="text-[10px] text-[#544438] mt-1">
                  500 cajas paletizadas en Muelle 1 listas para camión TR-7729.
                </p>
                <button
                  onClick={() => onNavigate('SCR-04')}
                  className="mt-2 w-full text-[10px] font-mono bg-[#283618] hover:bg-[#1b2413] text-[#dda15e] py-1 rounded font-bold text-center"
                >
                  Ver Remisión de Despacho →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
