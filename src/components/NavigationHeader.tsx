import React from 'react';
import { ScreenId } from '../types';
import { FileText, Layers, ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface NavigationHeaderProps {
  currentScreen: ScreenId;
  onSelectScreen?: (screen: ScreenId) => void;
  onNavigate?: (screen: ScreenId) => void;
  onOpenPromptsModal?: () => void;
  onOpenPromptModal?: () => void;
}

const SCREENS: { id: ScreenId; code: string; label: string; fileRef: string }[] = [
  { id: 'SCR-01', code: 'SCR-01', label: 'Autenticación', fileRef: 'index.html' },
  { id: 'SCR-02', code: 'SCR-02', label: 'Dashboard', fileRef: 'menu.jsp' },
  { id: 'SCR-03', code: 'SCR-03', label: 'Catálogo & Kárdex', fileRef: 'formularioProducto.jsp' },
  { id: 'SCR-04', code: 'SCR-04', label: 'Detalle 360', fileRef: 'formularioDetalleVenta.jsp' },
  { id: 'SCR-05', code: 'SCR-05', label: 'Wizard POS Modal', fileRef: 'formularioVenta.jsp' },
  { id: 'SCR-06', code: 'SCR-06', label: 'Configuración & Perfil', fileRef: 'configuracion.jsp' },
  { id: 'SCR-07', code: 'SCR-07', label: 'Consola & Calendario', fileRef: 'calendarioReportes.jsp' },
];

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  onSelectScreen,
  onNavigate,
  onOpenPromptsModal,
  onOpenPromptModal,
}) => {
  const handleSelect = (screen: ScreenId) => {
    if (typeof onSelectScreen === 'function') {
      onSelectScreen(screen);
    } else if (typeof onNavigate === 'function') {
      onNavigate(screen);
    }
  };

  const handleOpenPrompts = () => {
    if (typeof onOpenPromptsModal === 'function') {
      onOpenPromptsModal();
    } else if (typeof onOpenPromptModal === 'function') {
      onOpenPromptModal();
    }
  };
  return (
    <header className="bg-[#283618] text-[#fefae0] border-b-[3px] border-[#bc6c25] sticky top-0 z-40 shadow-md">
      {/* Top Banner with Identity */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#dda15e] inline-block animate-pulse"></span>
          <span className="font-mono text-[#dda15e] tracking-wider uppercase font-semibold">
            PAYARA 7.x JVM // ESTUDIO VELEÑO
          </span>
          <span className="hidden sm:inline text-stone-400">|</span>
          <span className="hidden md:inline font-sans text-stone-300">
            Fábrica de Bocadillos La Esperanza • Estilo #10 Warm Retro Vintage
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenPrompts}
            className="flex items-center gap-1.5 bg-[#bc6c25] hover:bg-[#8f4a00] text-[#fefae0] px-3 py-1 rounded text-xs font-semibold tracking-wide retro-shadow-sm retro-press border border-[#dda15e] transition-colors"
            title="Abrir Suite Completa de 7 Prompts para Google Stitch"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>06_PROMPTS_GOOGLE_STITCH.md</span>
            <span className="bg-[#283618] text-[#dda15e] px-1.5 py-0.2 rounded font-mono text-[10px]">
              7 PROMPTS
            </span>
          </button>
        </div>
      </div>

      {/* Screen Selector Bar */}
      <div className="bg-[#1b2413] px-3 py-1.5 border-t border-[#3a4d22] overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-max">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#dda15e] font-mono font-bold flex items-center gap-1 mr-2 px-1">
              <Compass className="w-3.5 h-3.5" />
              <span>PANTALLAS:</span>
            </span>

            {SCREENS.map((s) => {
              const isActive = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s.id)}
                  className={`px-2.5 py-1 rounded font-sans text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#bc6c25] text-[#fefae0] font-bold retro-shadow-sm border border-[#dda15e]'
                      : 'text-stone-300 hover:text-white hover:bg-[#283618] border border-transparent'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#dda15e] font-bold">
                    {s.code}
                  </span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-stone-300 bg-[#283618]/60 px-2 py-0.5 rounded border border-[#3a4d22]">
            <span className="text-[#dda15e]">DO VÉLEZ</span>
            <span>Ley 2020</span>
          </div>
        </div>
      </div>
    </header>
  );
};
