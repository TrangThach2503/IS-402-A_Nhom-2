import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Target, DollarSign, Store } from 'lucide-react';

export default function KpiCard({
  title,
  value,
  subValue,
  badgeText,
  badgeType = 'mint', // 'mint' | 'peach' | 'sky' | 'coral'
  progress,
  icon: Icon
}) {
  const badgeStyles = {
    mint: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
    peach: 'bg-[#FFEDD5] text-[#C2410C] border-[#FDBA74]',
    sky: 'bg-[#E0F2FE] text-[#0369A1] border-[#7DD3FC]',
    coral: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECDD3]',
  };

  const iconBgStyles = {
    mint: 'bg-emerald-50 text-emerald-600',
    peach: 'bg-orange-50 text-orange-600',
    sky: 'bg-blue-50 text-blue-600',
    coral: 'bg-rose-50 text-rose-600',
  };

  const progressBarColors = {
    mint: 'bg-emerald-500',
    peach: 'bg-amber-500',
    sky: 'bg-blue-500',
    coral: 'bg-rose-500',
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(148,163,184,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          {Icon && (
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${iconBgStyles[badgeType]}`}>
              <Icon className="w-4 h-4 stroke-[2.3]" />
            </div>
          )}
        </div>

        <div className="flex items-baseline space-x-2.5">
          <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        {subValue && (
          <div className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed">
            {subValue}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${badgeStyles[badgeType]}`}>
          {badgeText}
        </span>

        {progress !== undefined && (
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`${progressBarColors[badgeType] || 'bg-amber-500'} h-full rounded-full transition-all duration-500`} 
                style={{ width: `${Math.min(100, progress)}%` }}
              ></div>
            </div>
            <span className="text-[11px] font-extrabold text-slate-700">{progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
