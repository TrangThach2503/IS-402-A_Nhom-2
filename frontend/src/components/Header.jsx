import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Download, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  title = "BẢNG ĐIỀU KHIỂN GIÁM SÁT SAI LỆCH & CẢNH BÁO DOANH SỐ", 
  subtitle = "Nhận diện chênh lệch thực tế so với kế hoạch, phân rã nguyên nhân biến động và kích hoạt can thiệp sớm"
}) {
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            DỮ LIỆU ĐỒNG BỘ TRỰC TUYẾN
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">
            Chuỗi WinMart & WinMart+ Đà Nẵng • 32 Điểm Bán (Masan WinCommerce)
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Bộ lọc & Nút xuất báo cáo */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Bộ lọc kỳ kế hoạch & chiến dịch */}
        <div className="relative">
          <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Cẩm Nang Mua Sắm WinMart Đà Nẵng</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Bộ lọc phạm vi chi nhánh */}
        <div className="relative">
          <div className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Toàn Chuỗi Đà Nẵng (32 Điểm Bán: 1 Siêu Thị + 31 Cửa Hàng)</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Nút xuất báo cáo */}
        <button 
          onClick={() => alert('Đang xuất Báo cáo DSS chuẩn định dạng PDF/Excel...')}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Xuất Báo Cáo WinMart DSS</span>
        </button>
      </div>
    </header>
  );
}
