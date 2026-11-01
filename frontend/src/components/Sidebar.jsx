import React from 'react';
import { 
  BarChart3, 
  BrainCircuit, 
  Sliders, 
  Target, 
  LogOut, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab = 'dashboard', onNavigate, onLogout, currentUser }) {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Giám Sát Sai Lệch', 
      icon: BarChart3,
      phase: 'Pha 1 • Nhận diện biến động'
    },
    { 
      id: 'forecast', 
      label: 'Xưởng Dự Báo AI', 
      icon: BrainCircuit,
      phase: 'Pha 2 • Mô hình hóa tương lai'
    },
    { 
      id: 'whatif', 
      label: 'Hộp Cát What-If', 
      icon: Sliders,
      phase: 'Pha 3 • Thử nghiệm kịch bản'
    },
    { 
      id: 'quota', 
      label: 'Phân Bổ Quota', 
      icon: Target,
      phase: 'Pha 4 • Ban hành chỉ tiêu'
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-[#E2E8F0] min-h-screen flex flex-col justify-between sticky top-0 h-screen select-none z-20">
      <div>
        {/* Logo Branding */}
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <BarChart3 className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-900 leading-none">
              Sales<span className="text-blue-600">DSS</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1 block">
              WinMart+ Đà Nẵng
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="p-4 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Phân Hệ Ra Quyết Định
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'bg-[#EFF6FF] text-blue-700 shadow-xs border border-blue-200/80 font-extrabold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="leading-snug">{item.label}</div>
                    <div className="text-[10px] font-normal text-slate-400">{item.phase}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  {isActive ? (
                    <div className="w-6 h-6 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-700">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer User Info */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentUser?.role === 'analyst' ? 'CV' : 'GD'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-800 truncate">
                {currentUser?.name || 'Thạch Hoài Trang'}
              </div>
              <div className="text-[10px] font-semibold text-blue-600 truncate flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-500 inline" />
                {currentUser?.role === 'analyst' ? 'Chuyên Viên Kế Hoạch WinMart+' : 'Giám Đốc Vùng • WinCommerce'}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Đăng xuất"
            className="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
