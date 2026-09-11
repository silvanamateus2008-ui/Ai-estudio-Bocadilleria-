import React, { useState } from 'react';
import { ScreenId } from './types';
import { useAuth } from './auth/AuthContext';
import { NavigationHeader } from './components/NavigationHeader';
import { Sidebar } from './components/Sidebar';
import { StitchPromptsModal } from './components/StitchPromptsModal';
import { Screen01Auth } from './screens/Screen01Auth';
import { Screen02Dashboard } from './screens/Screen02Dashboard';
import { Screen03Catalog } from './screens/Screen03Catalog';
import { Screen04Detail360 } from './screens/Screen04Detail360';
import { Screen05ModalWizard } from './screens/Screen05ModalWizard';
import { Screen06Settings } from './screens/Screen06Settings';
import { Screen07AuditLogs } from './screens/Screen07AuditLogs';
import { CheckCircle2, FileCode2, Lock } from 'lucide-react';

export default function App() {
  const { authenticated, loading, signOut, sessionInfo } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('SCR-02');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [selectedPromptCode, setSelectedPromptCode] = useState<ScreenId>('SCR-02');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4200);
  };

  const handleOpenPromptModal = (screenCode?: ScreenId) => {
    if (screenCode) {
      setSelectedPromptCode(screenCode);
    } else {
      setSelectedPromptCode(currentScreen);
    }
    setIsPromptModalOpen(true);
  };

  const handleSelectScreen = (id: ScreenId) => {
    if (id === 'SCR-01') {
      void signOut().then(() => showToast('Sesión cerrada. ¡Vuelva pronto, Don Carlos Ruiz!'));
      return;
    }
    setCurrentScreen(id);
  };

  const handleLogout = () => {
    void signOut().then(() => showToast('Sesión cerrada. ¡Vuelva pronto, Don Carlos Ruiz!'));
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('SCR-02');
  };

  const loginUserLabel = sessionInfo?.provider === 'demo' ? 'Don Carlos Ruiz' : sessionInfo?.email ?? 'Operador';

  /* Pantalla de carga de restauración de sesión (guía: Loading Skeleton) */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefae0] text-[#1d1c0d] flex flex-col items-center justify-center p-6">
        <div className="bg-[#f4f1de] border-[3px] border-[#bc6c25] rounded retro-shadow-lg p-8 w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#8f4a00]">
            <Lock className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Verificando sesión HTTP en Payara Server 7.x...
            </span>
          </div>
          <div className="space-y-3 animate-pulse">
            <div className="h-3 bg-[#e7e3ca] rounded w-3/4"></div>
            <div className="h-3 bg-[#e7e3ca] rounded w-1/2"></div>
            <div className="h-8 bg-[#dda15e]/50 rounded"></div>
          </div>
          <div className="mt-5 h-3 bg-[#e7e3ca] rounded overflow-hidden">
            <div className="h-full w-1/3 bg-[#bc6c25] animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  /* Compuerta de autenticación: sin sesión activa SOLO se muestra el login (SCR-01) */
  if (!authenticated) {
    return (
      <>
        <Screen01Auth onLoginSuccess={handleLoginSuccess} showToast={showToast} />
        {toastMessage && (
          <div className="fixed bottom-14 right-4 z-50 bg-[#283618] text-[#fefae0] border-2 border-[#dda15e] px-4 py-2.5 rounded retro-shadow-lg flex items-center gap-2.5 text-xs font-sans animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefae0] text-[#1d1c0d] font-sans flex flex-col selection:bg-[#dda15e] selection:text-[#1d1c0d]">
      {/* Top Universal Archival Navigation Header */}
      <NavigationHeader
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        onNavigate={handleSelectScreen}
        onOpenPromptModal={handleOpenPromptModal}
        onOpenPromptsModal={handleOpenPromptModal}
      />

      {/* Screen Render Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar only shown on regular app screens (not standalone Auth SCR-01) */}
        {currentScreen !== 'SCR-01' && (
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={handleSelectScreen}
            onSelectScreen={handleSelectScreen}
            onOpenPromptModal={handleOpenPromptModal}
            onLogout={handleLogout}
            operatorLabel={loginUserLabel}
          />
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#fefae0]">
          {currentScreen === 'SCR-01' && (
            <Screen01Auth onLoginSuccess={handleLoginSuccess} showToast={showToast} />
          )}
          {currentScreen === 'SCR-02' && (
            <Screen02Dashboard onNavigate={handleSelectScreen} showToast={showToast} />
          )}
          {currentScreen === 'SCR-03' && (
            <Screen03Catalog onNavigate={handleSelectScreen} showToast={showToast} />
          )}
          {currentScreen === 'SCR-04' && (
            <Screen04Detail360 onNavigate={handleSelectScreen} showToast={showToast} />
          )}
          {currentScreen === 'SCR-05' && (
            <Screen05ModalWizard onNavigate={handleSelectScreen} showToast={showToast} />
          )}
          {currentScreen === 'SCR-06' && (
            <Screen06Settings onNavigate={handleSelectScreen} showToast={showToast} />
          )}
          {currentScreen === 'SCR-07' && (
            <Screen07AuditLogs onNavigate={handleSelectScreen} showToast={showToast} />
          )}
        </main>
      </div>

      {/* Quick Screen Selector Bottom Dock for Seamless Review */}
      <div className="bg-[#283618] text-[#fefae0] px-3 py-2 border-t-2 border-[#dda15e] flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-lg z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] text-[#dda15e] font-bold hidden sm:inline">
            SUITE 7 PANTALLAS GOOGLE STITCH:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto">
            {(['SCR-01', 'SCR-02', 'SCR-03', 'SCR-04', 'SCR-05', 'SCR-06', 'SCR-07'] as ScreenId[]).map(
              (id) => (
                <button
                  key={id}
                  onClick={() => handleSelectScreen(id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                    currentScreen === id
                      ? 'bg-[#dda15e] text-[#1d1c0d] font-bold retro-shadow-sm scale-105'
                      : 'text-[#fefae0]/80 hover:bg-[#1b2413] hover:text-white'
                  }`}
                >
                  {id === 'SCR-01' ? 'SALIR' : id}
                </button>
              )
            )}
          </div>
        </div>

        <button
          onClick={() => handleOpenPromptModal(currentScreen)}
          className="bg-[#bc6c25] hover:bg-[#8f4a00] text-[#fefae0] px-3 py-1 rounded text-xs font-bold font-sans flex items-center gap-1.5 retro-shadow-sm border border-[#dda15e] transition-colors"
        >
          <FileCode2 className="w-3.5 h-3.5 text-[#dda15e]" />
          <span>Ver Prompt Stitch ({currentScreen})</span>
        </button>
      </div>

      {/* Global Success Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-14 right-4 z-50 bg-[#283618] text-[#fefae0] border-2 border-[#dda15e] px-4 py-2.5 rounded retro-shadow-lg flex items-center gap-2.5 text-xs font-sans animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Google Stitch Prompts Modal Dialog */}
      <StitchPromptsModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        initialScreenCode={selectedPromptCode}
        onNavigateToScreen={handleSelectScreen}
        onNavigate={handleSelectScreen}
      />
    </div>
  );
}