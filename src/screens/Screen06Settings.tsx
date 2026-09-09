import React, { useState } from 'react';
import { ScreenId, UIState } from '../types';
import { IMAGES } from '../data/domainData';
import { StateControlBar } from '../components/StateControlBar';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Save, 
  Key, 
  Database, 
  Bell, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Upload, 
  Trash2, 
  Server,
  Globe,
  Palette
} from 'lucide-react';

interface Screen06SettingsProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string) => void;
}

export const Screen06Settings: React.FC<Screen06SettingsProps> = ({
  onNavigate,
  showToast,
}) => {
  const [uiState, setUiState] = useState<UIState>('normal');
  const [activeMenu, setActiveMenu] = useState<'perfil' | 'seguridad' | 'alertas' | 'api' | 'facturacion'>('perfil');

  // Form states
  const [fullName, setFullName] = useState('Carlos Alberto Ruiz');
  const [email, setEmail] = useState('carlos.ruiz@bocadilloslaesperanza.com');
  const [phone, setPhone] = useState('+57 (607) 756-3210');
  const [location, setLocation] = useState('Planta Central Vélez - Paila Guavatá #2 (Sector Las Riberas)');

  // Toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSyncMySQL, setAutoSyncMySQL] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('es-CO');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Cambios Guardados con Éxito: Preferencias de perfil actualizadas correctamente en Payara 7 & MySQL');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#bc6c25]">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
            AJUSTES DEL SISTEMA // CONFIGURACIÓN GENERAL & PERFIL
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1d1c0d]">
            Configuración del Sistema & Perfil de Usuario
          </h1>
          <p className="text-xs text-[#544438] mt-0.5 font-sans">
            Administración de credenciales de planta, sincronización con Payara Server 7.x / MySQL y preferencias maestras de Don Carlos Ruiz.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveProfile}
            className="bg-[#283618] hover:bg-[#1b2413] text-[#dda15e] px-4 py-2 rounded text-xs font-bold font-sans flex items-center gap-1.5 retro-shadow retro-press border border-[#dda15e] transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>

      {/* State Control Bar */}
      <StateControlBar
        currentState={uiState}
        onSelectState={setUiState}
        onTriggerToast={() =>
          showToast('Cambios Guardados con Éxito: Preferencias de perfil actualizadas correctamente en Payara 7 & MySQL')
        }
        screenCode="SCR-06"
      />

      {/* Error Alert Banner */}
      {uiState === 'error' && (
        <div className="bg-[#ffdad6] border-[2px] border-[#9a031e] text-[#9a031e] p-3.5 rounded flex items-center justify-between gap-3 retro-shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <strong className="block font-bold">Error de Autenticación de Nodo Local:</strong>
              Error al cambiar la contraseña: La contraseña actual no coincide con los registros del nodo Vélez (Payara AuthRealm v7.4).
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

      {/* Split Settings Grid: Left Nav (3 cols) / Right Content (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Panel (3 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-3 retro-shadow">
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold block mb-2 px-1">
              SECCIONES DE AJUSTES
            </span>
            <nav className="space-y-1 text-xs font-sans">
              <button
                onClick={() => setActiveMenu('perfil')}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition-all ${
                  activeMenu === 'perfil'
                    ? 'bg-[#bc6c25] text-white font-bold retro-shadow-sm'
                    : 'text-[#1d1c0d] hover:bg-[#fefae0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Mi Perfil de Maestro</span>
                </div>
                {activeMenu === 'perfil' && <span>→</span>}
              </button>

              <button
                onClick={() => setActiveMenu('seguridad')}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition-all ${
                  activeMenu === 'seguridad'
                    ? 'bg-[#bc6c25] text-white font-bold retro-shadow-sm'
                    : 'text-[#1d1c0d] hover:bg-[#fefae0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Seguridad & Claves</span>
                </div>
              </button>

              <button
                onClick={() => setActiveMenu('alertas')}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition-all ${
                  activeMenu === 'alertas'
                    ? 'bg-[#bc6c25] text-white font-bold retro-shadow-sm'
                    : 'text-[#1d1c0d] hover:bg-[#fefae0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Preferencias de Alertas</span>
                </div>
              </button>

              <button
                onClick={() => setActiveMenu('api')}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition-all ${
                  activeMenu === 'api'
                    ? 'bg-[#bc6c25] text-white font-bold retro-shadow-sm'
                    : 'text-[#1d1c0d] hover:bg-[#fefae0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>Conexión MySQL & API</span>
                </div>
                <span className="text-[10px] font-mono bg-[#dda15e]/40 text-[#8f4a00] px-1.5 py-0.2 rounded">
                  3 Endpoints
                </span>
              </button>
            </nav>
          </div>

          {/* Database Health Card */}
          <div className="bg-[#fefae0] border-2 border-[#bc6c25] p-3.5 rounded retro-shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#283618] mb-1">
              <Server className="w-4 h-4 text-[#bc6c25]" />
              <span>PAYARA POOL MYSQL: ESTABLE</span>
            </div>
            <p className="text-[11px] text-[#544438] leading-tight font-sans">
              Hilos activos: 22/25. Latencia promedio con la base de datos de producción: 14ms.
            </p>
            <div className="mt-2 pt-2 border-t border-[#bc6c25]/20 flex items-center justify-between text-[10px] font-mono text-[#8f4a00]">
              <span>JDBC: jdbc/bocadillo_pool</span>
              <span className="text-emerald-800 font-bold">✓ Conectado</span>
            </div>
          </div>

          {/* Certified Seal Box */}
          <div className="bg-[#f4f1de] p-3 rounded border border-[#dda15e] text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-[#283618]">
              <ShieldCheck className="w-4 h-4 text-[#bc6c25]" />
              <span>Denominación de Origen</span>
            </div>
            <p className="text-[10px] text-[#544438] mt-1 font-sans">
              Resolución No. 34819 de Calidad Agroartesanal. Municipio de Vélez, Santander.
            </p>
          </div>
        </div>

        {/* Right Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeMenu === 'api' || uiState === 'empty' ? (
            /* API Keys Empty State */
            <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded p-8 text-center retro-shadow">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f4f1de] border-2 border-[#bc6c25] flex items-center justify-center text-[#8f4a00]">
                <Key className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1d1c0d]">
                No hay claves de API creadas
              </h3>
              <p className="text-xs text-[#544438] max-w-md mx-auto mt-1 mb-5 font-sans">
                Genere una credencial de acceso seguro para integrar el software de Punto de Venta (POS) o la báscula de pesaje de guayaba con Payara Server 7.x.
              </p>
              <button
                onClick={() => {
                  showToast('Generando nueva API Key: velez_live_9941a87b...');
                  setActiveMenu('perfil');
                  setUiState('normal');
                }}
                className="bg-[#bc6c25] hover:bg-[#8f4a00] text-white text-xs font-bold px-4 py-2 rounded retro-shadow-sm transition-colors"
              >
                + Generar Nueva Key
              </button>
            </div>
          ) : (
            /* Normal Settings Profile Form */
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Section 1: Profile Information */}
              <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded p-5 retro-shadow">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#bc6c25]/30">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
                      SEC // 01-A • INFORMACIÓN DE PERFIL
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#1d1c0d]">
                      Datos del Administrador General
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-[#d7e9bd] text-[#283618] px-2 py-0.5 rounded font-bold">
                    [✓] ACTIVO EN TURNO
                  </span>
                </div>

                {/* Avatar Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-[#f4f1de] p-3.5 rounded border border-[#bc6c25]">
                  {uiState === 'loading' ? (
                    <div className="w-16 h-16 rounded-full bg-[#e7e3ca] animate-pulse"></div>
                  ) : (
                    <img
                      src={IMAGES.donCarlosRuiz}
                      alt="Don Carlos Ruiz"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#bc6c25] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-serif font-bold text-sm text-[#1d1c0d]">
                      Don Carlos Alberto Ruiz Mendoza
                    </h4>
                    <p className="text-xs text-[#544438] font-sans">
                      Administrador General & Maestro Dulcero • Responsable de pailas desde 1994
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showToast('Abriendo selector de nueva fotografía de perfil...')}
                      className="bg-[#283618] text-[#dda15e] px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Cambiar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Fotografía de perfil restaurada a predeterminada.')}
                      className="text-[#9a031e] hover:bg-[#ffdad6] p-1.5 rounded transition-colors"
                      title="Eliminar avatar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2-Column Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-[#bc6c25] rounded font-mono text-[#1d1c0d] text-xs"
                      />
                      <User className="w-3.5 h-3.5 text-[#8f4a00] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                      Correo Institucional
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-[#bc6c25] rounded font-mono text-[#1d1c0d] text-xs"
                      />
                      <Mail className="w-3.5 h-3.5 text-[#8f4a00] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                      Teléfono de Planta
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-[#bc6c25] rounded font-mono text-[#1d1c0d] text-xs"
                      />
                      <Phone className="w-3.5 h-3.5 text-[#8f4a00] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                      Rol en la Planta
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value="Administrador General & Head Admin"
                        className="w-full pl-8 pr-3 py-2 bg-[#f4f1de] border border-[#bc6c25]/40 rounded font-mono text-[#544438] text-xs cursor-not-allowed"
                      />
                      <Lock className="w-3.5 h-3.5 text-[#544438] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                      Sede Agroindustrial Asignada
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#bc6c25] rounded font-sans text-[#1d1c0d] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Preferences & Toggles */}
              <div className="bg-[#fefae0] border-2 border-[#bc6c25] rounded p-5 retro-shadow">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#bc6c25]/30">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold">
                      SEC // 01-B • PREFERENCIAS DEL SISTEMA
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#1d1c0d]">
                      Sincronización Automática & Notificaciones
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#544438]">
                    AUTO-GUARDADO LOCAL
                  </span>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  {/* Toggle 1 */}
                  <label className="flex items-start justify-between gap-3 p-3 bg-[#f4f1de] rounded border border-[#bc6c25] cursor-pointer">
                    <div>
                      <strong className="text-[#1d1c0d] block">
                        Notificaciones por Correo Electrónico
                      </strong>
                      <p className="text-[11px] text-[#544438] mt-0.5">
                        Recibir alertas automáticas de bajo stock en guayaba regional, mermas de panela y confirmaciones de pago mayorista.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="mt-1 rounded text-[#283618] focus:ring-0 w-4 h-4"
                    />
                  </label>

                  {/* Toggle 2 */}
                  <label className="flex items-start justify-between gap-3 p-3 bg-[#f4f1de] rounded border border-[#bc6c25] cursor-pointer">
                    <div>
                      <strong className="text-[#1d1c0d] block">
                        Sincronización Automática de Stock en MySQL
                      </strong>
                      <p className="text-[11px] text-[#544438] mt-0.5">
                        Reflejar movimientos de kárdex, pesado de cajas en hoja de plátano y lotes cada 5 minutos en el clúster Payara 7.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSyncMySQL}
                      onChange={(e) => setAutoSyncMySQL(e.target.checked)}
                      className="mt-1 rounded text-[#283618] focus:ring-0 w-4 h-4"
                    />
                  </label>

                  {/* Dropdown 1: Language */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                        Idioma de la Interfaz
                      </label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full p-2 bg-white border border-[#bc6c25] rounded text-xs font-sans"
                      >
                        <option value="es-CO">Español (Colombia - Vélez)</option>
                        <option value="en-US">English (Agroindustrial Export)</option>
                      </select>
                      <span className="text-[10px] text-[#8f4a00] font-mono mt-1 block">
                        Incluye terminología típica: paila, bijao, lonja.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#544438] font-bold mb-1">
                        Tema Visual de Pantalla
                      </label>
                      <div className="p-2 bg-white border border-[#bc6c25] rounded text-xs font-sans flex items-center justify-between">
                        <span>Retro Vintage Veleño #10 (Activo)</span>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#fefae0] border border-[#283618]"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#dda15e]"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#bc6c25]"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#283618]"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Audit Ribbon Footer */}
          <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] text-xs font-mono text-[#544438] flex flex-wrap items-center justify-between gap-2">
            <span>
              Registro de Auditoría de Usuario <strong>#00192</strong> • Firma Criptográfica Don Carlos Ruiz
            </span>
            <span className="text-[#8f4a00] font-bold">[DIAN HABILITADO]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
