import React from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../data/domainData';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  CalendarClock, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Flame
} from 'lucide-react';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate?: (screen: ScreenId) => void;
  onSelectScreen?: (screen: ScreenId) => void;
  onOpenPromptModal?: (screenCode?: ScreenId) => void;
  onLogout?: () => void;
  operatorLabel?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentScreen, 
  onNavigate, 
  onSelectScreen,
  onOpenPromptModal,
  onLogout,
  operatorLabel
}) => {
  const navigate = (screen: ScreenId) => {
    if (typeof onNavigate === 'function') {
      onNavigate(screen);
    } else if (typeof onSelectScreen === 'function') {
      onSelectScreen(screen);
    }
  };
  const menuItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'SCR-02',
      label: 'Dashboard Principal',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'SCR-03',
      label: 'Catálogo de Bocadillos',
      icon: <Package className="w-4 h-4" />,
      badge: '24 Refs',
    },
    {
      id: 'SCR-04',
      label: 'Detalle Facturación 360',
      icon: <Users className="w-4 h-4" />,
      badge: 'FACT-8942',
    },
    {
      id: 'SCR-05',
      label: 'Punto de Venta (Wizard)',
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: 'POS',
    },
    {
      id: 'SCR-07',
      label: 'Despachos & Consola',
      icon: <CalendarClock className="w-4 h-4" />,
      badge: 'Payara 7',
    },
    {
      id: 'SCR-06',
      label: 'Ajustes del Sistema',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-72 shrink-0 bg-[#f4f1de] border-r-[3px] border-[#bc6c25] flex flex-col justify-between p-4 shadow-[2px_0px_0px_#283618] h-[calc(100vh-82px)] sticky top-[82px] overflow-y-auto">
      {/* Brand & Emblem */}
      <div>
        <div className="bg-[#fefae0] p-3 rounded border-[2px] border-[#bc6c25] retro-shadow-sm mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#bc6c25] bg-[#dda15e]/20 shrink-0 flex items-center justify-center p-0.5">
              <img 
                src={IMAGES.lonjaBijao} 
                alt="Logo La Esperanza" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#8f4a00] uppercase font-bold block">
                VÉLEZ SANTANDER
              </span>
              <h2 className="font-serif text-sm font-bold text-[#1d1c0d] leading-tight">
                La Esperanza
              </h2>
              <span className="text-[10px] text-[#544438] block font-sans">
                Fábrica de Bocadillos
              </span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#bc6c25]/30 flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#283618] font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#bc6c25]" />
              PAILA GUAVATÁ #2
            </span>
            <span className="bg-[#d7e9bd] text-[#283618] px-1.5 py-0.5 rounded text-[9px] font-bold border border-[#283618]/30">
              PRO v2.4
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#544438] font-bold px-2 block mb-1">
            LIBRO DE REGISTROS // JSP
          </span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded text-xs transition-all font-sans ${
                    isActive
                      ? 'bg-[#bc6c25] text-[#fefae0] font-bold retro-shadow-sm border border-[#283618]'
                      : 'text-[#1d1c0d] hover:bg-[#fefae0] hover:text-[#8f4a00] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#fefae0]' : 'text-[#8f4a00]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                        isActive
                          ? 'bg-[#283618] text-[#dda15e]'
                          : 'bg-[#dda15e]/30 text-[#8f4a00] border border-[#dda15e]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Denomination of Origin Stamp */}
        <div className="mt-5 p-2.5 rounded bg-[#fefae0] border border-[#dda15e] text-center">
          <div className="flex items-center justify-center gap-1 text-[#283618] text-[11px] font-bold font-serif">
            <ShieldCheck className="w-3.5 h-3.5 text-[#bc6c25]" />
            <span>Denominación de Origen</span>
          </div>
          <p className="text-[10px] text-[#544438] mt-0.5 leading-tight font-sans">
            Bocadillo Veleño tradicional en hoja de bijao certificada.
          </p>
        </div>
      </div>

      {/* Profile & Logout Card */}
      <div className="pt-3 border-t-2 border-[#bc6c25]/40 mt-4">
        <div className="bg-[#fefae0] p-2.5 rounded border border-[#bc6c25] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={IMAGES.donCarlosRuiz}
              alt="Don Carlos Ruiz"
              className="w-9 h-9 rounded-full object-cover border border-[#bc6c25] shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#1d1c0d] truncate font-serif">
                Don Carlos Ruiz
              </h4>
              <p className="text-[10px] text-[#544438] truncate font-sans">
                {operatorLabel || 'Adm. General de Planta'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (typeof onLogout === 'function') {
                onLogout();
              } else {
                navigate('SCR-01');
              }
            }}
            title="Cerrar Sesión"
            className="p-1.5 text-[#8f4a00] hover:text-[#9a031e] hover:bg-[#ffdad6] rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
