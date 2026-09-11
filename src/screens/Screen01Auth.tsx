import React, { useState } from 'react';
import { UIState } from '../types';
import { IMAGES } from '../data/domainData';
import { StateControlBar } from '../components/StateControlBar';
import { useAuth, DEMO_USERNAME, DEMO_PASSWORD } from '../auth/AuthContext';
import { 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertOctagon, 
  ArrowRight, 
  Loader2,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface Screen01AuthProps {
  onLoginSuccess: () => void;
  showToast: (msg: string) => void;
}

export const Screen01Auth: React.FC<Screen01AuthProps> = ({ onLoginSuccess, showToast }) => {
  const { signIn, isDemo } = useAuth();
  const [uiState, setUiState] = useState<UIState>('normal');
  const [username, setUsername] = useState('admin_laesperanza');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setUiState('loading');
    setAuthError(null);

    const { error } = await signIn(username, password, rememberSession);

    if (error) {
      setSubmitting(false);
      setUiState('error');
      setAuthError(error);
      return;
    }

    setSubmitting(false);
    setUiState('normal');
    showToast('¡Sesión Autorizada! ✓ Bienvenido Don Carlos Ruiz. Cargando Libro Mayor...');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#fefae0] p-3 sm:p-6 flex flex-col justify-between">
      {/* State Switcher Bar */}
      <div className="max-w-4xl mx-auto w-full">
        <StateControlBar
          currentState={uiState}
          onSelectState={setUiState}
          onTriggerToast={() =>
            showToast('¡Sesión Autorizada! ✓ Bienvenido Don Carlos Ruiz. Cargando Libro Mayor...')
          }
          screenCode="SCR-01"
        />

        {/* Error Alert Banner if in error state */}
        {uiState === 'error' && (
          <div className="mb-5 bg-[#ffdad6] border-[2px] border-[#9a031e] text-[#9a031e] p-3 rounded flex items-center justify-between gap-2 retro-shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <div className="text-xs">
                <strong className="block font-bold">✕ Acceso Denegado:</strong>
                {authError ?? 'Verifique sus credenciales con el administrador de planta o el servidor Payara 7.x.'}
              </div>
            </div>
            <button
              onClick={() => { setUiState('normal'); setAuthError(null); }}
              className="bg-[#9a031e] text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-[#800010] transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Masthead */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#dda15e]/30 border border-[#bc6c25] px-3 py-1 rounded-full text-xs font-mono text-[#8f4a00] font-bold mb-2">
            <Flame className="w-3.5 h-3.5 text-[#bc6c25]" />
            <span>PRODUCCIÓN VELEÑA • PRO v2.4</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d1c0d]">
            Fábrica de Bocadillos La Esperanza
          </h1>
          <p className="text-xs sm:text-sm text-[#544438] max-w-xl mx-auto mt-1 font-sans">
            Sistema de Gestión de Ventas, Inventario de Guayaba y Despachos Agroindustriales
          </p>
        </div>

        {/* Main Archival Auth Card */}
        <div className="bg-[#f4f1de] border-[3px] border-[#bc6c25] rounded retro-shadow-lg overflow-hidden max-w-md mx-auto">
          {/* Top Header Ribbon */}
          <div className="bg-[#283618] text-[#fefae0] px-4 py-2 flex items-center justify-between text-[11px] font-mono border-b-2 border-[#dda15e]">
            <span className="font-bold text-[#dda15e]">SEC // 04-B AGROINDUSTRIA</span>
            <span>REG. SANTANDER № 1898</span>
          </div>

          {/* Illustrated Guava Harvest Banner */}
          <div className="relative border-b-2 border-[#bc6c25] bg-[#dda15e]/20 h-40 overflow-hidden">
            <img
              src={IMAGES.bannerHarvest}
              alt="Cosecha de Guayaba y Paila de Cobre"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#283618]/90 via-transparent to-transparent flex items-end p-3">
              <div className="flex items-center justify-between w-full text-[10px] font-mono text-[#fefae0]">
                <span className="bg-[#bc6c25] px-2 py-0.5 rounded font-bold border border-[#fefae0]/30">
                  Hojas de Bijao Auténticas
                </span>
                <span className="bg-[#283618] px-2 py-0.5 rounded text-[#dda15e] border border-[#dda15e]">
                  Payara Server 7.x JVM
                </span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 bg-[#fefae0]">
            {/* Quick Operator Pill */}
            <div className="bg-[#f4f1de] p-2.5 rounded border border-[#bc6c25] mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                <span className="text-[11px] font-mono text-[#1d1c0d]">
                  Nodo Activo: <strong className="text-[#8f4a00]">admin_laesperanza</strong>
                </span>
              </div>
              <span className="text-[10px] bg-[#d7e9bd] text-[#283618] px-2 py-0.5 rounded font-mono font-bold">
                Nodo Vélez #1
              </span>
            </div>

            {/* Loading Skeleton State */}
            {uiState === 'loading' ? (
              <div className="space-y-4 py-4 animate-pulse">
                <div className="h-4 bg-[#e7e3ca] rounded w-3/4 mx-auto"></div>
                <div className="h-10 bg-[#e7e3ca] rounded"></div>
                <div className="h-10 bg-[#e7e3ca] rounded"></div>
                <div className="h-10 bg-[#dda15e]/50 rounded"></div>
                <p className="text-center font-mono text-[11px] text-[#8f4a00] pt-2">
                  Verificando sesión HTTP en Payara Server 7.x...
                </p>
              </div>
            ) : uiState === 'empty' ? (
              /* Empty State */
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#f4f1de] border-2 border-[#bc6c25] flex items-center justify-center text-[#8f4a00]">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#1d1c0d]">
                  Formulario Restablecido
                </h3>
                <p className="text-xs text-[#544438] mt-1 mb-4">
                  No hay credenciales en caché. Ingrese sus datos de operador.
                </p>
                <button
                  onClick={() => setUiState('normal')}
                  className="bg-[#283618] text-[#fefae0] text-xs px-3 py-1.5 rounded font-bold"
                >
                  Cargar Credenciales de Prueba
                </button>
              </div>
            ) : (
              /* Normal Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-[#bc6c25]/30">
                  <Lock className="w-4 h-4 text-[#8f4a00]" />
                  <h3 className="font-serif text-sm font-bold text-[#1d1c0d]">
                    Ingreso al Sistema JSP
                  </h3>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#544438] font-bold mb-1">
                    Usuario / Correo Institucional
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-white border-2 border-[#bc6c25] rounded focus:outline-hidden focus:border-[#283618] text-[#1d1c0d]"
                      placeholder="admin_laesperanza"
                    />
                    <User className="w-4 h-4 text-[#8f4a00] absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#544438] font-bold">
                      Contraseña de Acceso
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast('Contacte al administrador de planta para restablecer clave.')}
                      className="text-[10px] text-[#8f4a00] hover:underline font-sans"
                    >
                      ¿Olvidó su clave?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-9 py-2 text-xs font-mono bg-white border-2 border-[#bc6c25] rounded focus:outline-hidden focus:border-[#283618] text-[#1d1c0d]"
                      placeholder="Contraseña"
                    />
                    <KeyRound className="w-4 h-4 text-[#8f4a00] absolute left-2.5 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-[#8f4a00]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-sans text-[#544438]">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="rounded border-[#bc6c25] text-[#283618] focus:ring-0"
                    />
                    <span>Recordar sesión en Payara 7</span>
                  </label>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">
                    ✓ Activo
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#8f4a00] hover:bg-[#283618] disabled:opacity-70 disabled:cursor-wait text-[#fefae0] font-bold text-xs py-2.5 rounded retro-shadow retro-press flex items-center justify-center gap-2 border border-[#dda15e] transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#dda15e] animate-spin" />
                      <span>Verificando Credenciales...</span>
                    </>
                  ) : (
                    <>
                      <span>Ingresar al Sistema</span>
                      <ArrowRight className="w-4 h-4 text-[#dda15e]" />
                    </>
                  )}
                </button>

                <div className="pt-3 border-t border-[#bc6c25]/30 flex items-center justify-between text-[10px] text-[#544438] font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Cifrado Industrial 256-bit SSL
                  </span>
                  <span>Cert. Veleño N° 9942</span>
                </div>

                {isDemo && (
                  <div className="bg-[#f4f1de] border border-dashed border-[#bc6c25] rounded p-2 text-center text-[10px] font-mono text-[#544438]">
                    <span className="text-[#8f4a00] font-bold">MODO DEMO:</span>{' '}
                    usuario <strong>{DEMO_USERNAME}</strong> · clave <strong>{DEMO_PASSWORD}</strong>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Operational Bento Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-6">
          <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] text-center retro-shadow-sm">
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold block">
              ACOPIO REGIONAL
            </span>
            <span className="font-serif text-lg font-bold text-[#1d1c0d]">
              14.2 t Guayaba
            </span>
            <span className="text-[10px] text-[#544438] block">Chipatá, Guavatá y Vélez</span>
          </div>

          <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] text-center retro-shadow-sm">
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold block">
              EMPAQUE BIJAO
            </span>
            <span className="font-serif text-lg font-bold text-[#1d1c0d]">
              3,850 Cajas
            </span>
            <span className="text-[10px] text-[#544438] block">Hoja 100% biodegradable</span>
          </div>

          <div className="bg-[#f4f1de] p-3 rounded border border-[#bc6c25] text-center retro-shadow-sm">
            <span className="text-[10px] font-mono uppercase text-[#8f4a00] font-bold block">
              CALIDAD PROTEGIDA
            </span>
            <span className="font-serif text-lg font-bold text-[#1d1c0d]">
              100% Denom. Origen
            </span>
            <span className="text-[10px] text-[#544438] block">Ley 2020 de la República</span>
          </div>
        </div>
      </div>

      {/* System Footer */}
      <footer className="text-center text-[11px] text-[#544438] font-mono mt-8 pt-4 border-t border-[#bc6c25]/30">
        Bocadillos La Esperanza S.A.S. • Vélez, Santander, Colombia • Servidor Payara 7.2.1 • Edición Industrial Agropecuaria • JDK 21 LTS
      </footer>
    </div>
  );
};
