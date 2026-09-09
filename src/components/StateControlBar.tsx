import React from 'react';
import { UIState } from '../types';
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, Inbox } from 'lucide-react';

interface StateControlBarProps {
  currentState: UIState;
  onSelectState: (state: UIState) => void;
  onTriggerToast: () => void;
  screenCode: string;
}

export const StateControlBar: React.FC<StateControlBarProps> = ({
  currentState,
  onSelectState,
  onTriggerToast,
  screenCode,
}) => {
  return (
    <div className="bg-[#f4f1de] border-2 border-[#bc6c25] rounded p-2.5 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs retro-shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[#8f4a00] font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" />
          SIMULADOR DE ESTADOS ({screenCode}):
        </span>
        <span className="hidden sm:inline text-[#544438] text-[11px]">
          (Obligatorios en Google Stitch)
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => onSelectState('normal')}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
            currentState === 'normal'
              ? 'bg-[#283618] text-[#fefae0] retro-shadow-sm border border-[#283618]'
              : 'bg-[#fefae0] text-[#1d1c0d] hover:bg-white border border-[#bc6c25]'
          }`}
        >
          <CheckCircle2 className="w-3 h-3 text-[#dda15e]" />
          <span>[1] Normal</span>
        </button>

        <button
          onClick={() => onSelectState('loading')}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
            currentState === 'loading'
              ? 'bg-[#bc6c25] text-[#fefae0] retro-shadow-sm border border-[#8f4a00]'
              : 'bg-[#fefae0] text-[#1d1c0d] hover:bg-white border border-[#bc6c25]'
          }`}
        >
          <RefreshCw className={`w-3 h-3 ${currentState === 'loading' ? 'animate-spin' : ''}`} />
          <span>[2] Loading Skeleton</span>
        </button>

        <button
          onClick={() => onSelectState('empty')}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
            currentState === 'empty'
              ? 'bg-[#8f4a00] text-[#fefae0] retro-shadow-sm border border-[#8f4a00]'
              : 'bg-[#fefae0] text-[#1d1c0d] hover:bg-white border border-[#bc6c25]'
          }`}
        >
          <Inbox className="w-3 h-3" />
          <span>[3] Empty State</span>
        </button>

        <button
          onClick={() => onSelectState('error')}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
            currentState === 'error'
              ? 'bg-[#9a031e] text-[#fefae0] retro-shadow-sm border border-[#9a031e]'
              : 'bg-[#fefae0] text-[#9a031e] hover:bg-[#ffdad6] border border-[#9a031e]'
          }`}
        >
          <AlertTriangle className="w-3 h-3" />
          <span>[4] Error Alert</span>
        </button>

        <span className="text-[#544438] hidden sm:inline">|</span>

        <button
          onClick={onTriggerToast}
          className="px-2.5 py-1 rounded text-xs font-semibold bg-[#dda15e] hover:bg-[#bc6c25] text-[#1d1c0d] hover:text-white border border-[#8f4a00] retro-shadow-sm transition-colors flex items-center gap-1"
        >
          <span>Disparar Toast Flotante</span>
        </button>
      </div>
    </div>
  );
};
