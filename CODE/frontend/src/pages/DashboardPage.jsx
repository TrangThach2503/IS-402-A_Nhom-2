import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import KpiCard from '../components/KpiCard';
import WaterfallChart from '../components/WaterfallChart';
import { 
  monthlySalesData, 
  waterfallItems, 
  redFlagStores 
} from '../services/mockData';
import { 
  DollarSign, 
  Target, 
  TrendingUp, 
  AlertOctagon, 
  ArrowRight, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function DashboardPage({ onLogout, onNavigate, currentUser }) {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar cố định bên trái */}
      <Sidebar 
        activeTab="dashboard" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        currentUser={currentUser} 
      />

      {/* Vùng nội dung chính cuộn dọc */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          title="BẢNG ĐIỀU KHIỂN GIÁM SÁT SAI LỆCH & CẢNH BÁO DOANH SỐ"
          subtitle="Giám sát độ lệch chỉ tiêu bán hàng, phân rã nguyên nhân biến động và kích hoạt can thiệp sớm"
        />

        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* ========================================================================= */}
          {/* 1. KHỐI 4 THẺ KPI CHỈ SỐ RA QUYẾT ĐỊNH (4 CỘT)                            */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KpiCard
              title="Doanh Số Thực Tế Lũy Kế"
              value="28.45 Tỷ"
              subValue="Toàn chuỗi 32 điểm bán WinMart & WinMart+ ĐN"
              badgeText="VƯỢT +6.9% KẾ HOẠCH"
              badgeType="mint"
              icon={DollarSign}
            />

            <KpiCard
              title="Tổng Chỉ Tiêu Kế Hoạch Giao"
              value="26.60 Tỷ"
              subValue="Chỉ tiêu Masan WinCommerce giao Quý này"
              badgeText="106.9% TIẾN ĐỘ"
              badgeType="peach"
              progress={106.9}
              icon={Target}
            />

            <KpiCard
              title="Tốc Độ Tăng Trưởng YoY"
              value="+14.2%"
              subValue="Tăng trưởng nhờ Hội viên WiN & Cẩm nang mua sắm"
              badgeText="TĂNG TRƯỞNG MẠNH"
              badgeType="sky"
              icon={TrendingUp}
            />

            <KpiCard
              title="Chi Nhánh Cảnh Báo Đỏ"
              value="2 / 32 Điểm Bán"
              subValue="Độ lệch âm > 10% so với chỉ tiêu giao khoán"
              badgeText="CẦN CAN THIỆP NGAY"
              badgeType="coral"
              icon={AlertOctagon}
            />
          </div>

          {/* ========================================================================= */}
          {/* 2. KHỐI ĐỒ THỊ PHÂN TÍCH: QUỸ ĐẠO DOANH SỐ & BÓC TÁCH THÁC NƯỚC (2 CỘT)    */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Cột trái: Biểu đồ đường kép Doanh số Thực tế vs Kế hoạch */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(148,163,184,0.08)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                    QUỸ ĐẠO DOANH THU THỰC TẾ SO VỚI KẾ HOẠCH
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    CHUỖI 12 THÁNG
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  So sánh đường Doanh thu Thực tế (Xanh mint) so với Mục tiêu Kế hoạch (Cam đào)
                </p>
              </div>

              {/* Khung đồ thị Recharts */}
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorThucTe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                      </linearGradient>
                      <linearGradient id="colorKeHoach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[1.5, 3.2]} />
                    <Tooltip 
                      formatter={(val) => [`${val} Tỷ VNĐ`]}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="thucTe" name="Doanh Số Thực Tế (Tỷ đ)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorThucTe)" />
                    <Line type="monotone" dataKey="keHoach" name="Chỉ Tiêu Kế Hoạch (Tỷ đ)" stroke="#F59E0B" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#F59E0B' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Đỉnh doanh thu: T01/26 (2.95 Tỷ)</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">8/12 Tháng vượt chỉ tiêu</span>
              </div>
            </div>

            {/* Cột phải: Biểu đồ Thác nước Waterfall Variance */}
            <WaterfallChart items={waterfallItems} />
          </div>

          {/* ========================================================================= */}
          {/* 3. KHỐI BẢNG CẢNH BÁO ĐỎ & HÀNH ĐỘNG CAN THIỆP DSS (HỘI ĐỒNG CHẤM CAO)    */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(148,163,184,0.08)] overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                  DANH SÁCH CHI NHÁNH CÓ NGUY CƠ VỠ KẾ HOẠCH
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                    2 ĐIỂM BÁN BÁO ĐỘNG
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Các chi nhánh có mức sai lệch âm vượt quá ngưỡng dung sai 10% cần người lãnh đạo can thiệp tức thì
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  Hiển thị: 2 / 32 Điểm bán có nguy cơ
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 shadow-2xs">
                  Ngưỡng dung sai: &Delta; &lt; -10%
                </span>
              </div>
            </div>

            {/* Bảng danh sách cảnh báo */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Mã Đơn Vị</th>
                    <th className="py-3.5 px-6">Tên Chi Nhánh & Phụ Trách</th>
                    <th className="py-3.5 px-6 text-right">Doanh Số Thực Tế</th>
                    <th className="py-3.5 px-6 text-right">Chỉ Tiêu Kế Hoạch</th>
                    <th className="py-3.5 px-6 text-right">Độ Lệch Âm (Δ)</th>
                    <th className="py-3.5 px-6">Nguyên Nhân Gốc Rễ (Root Cause)</th>
                    <th className="py-3.5 px-6 text-center">Hành Động Can Thiệp DSS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {redFlagStores.map((store) => (
                    <tr key={store.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[11px]">
                          {store.id}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {store.name}
                          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">{store.address}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Phụ trách: {store.manager}</div>
                      </td>

                      <td className="py-4 px-6 text-right font-extrabold text-slate-900">
                        {store.actual}
                      </td>

                      <td className="py-4 px-6 text-right font-bold text-slate-500">
                        {store.target}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <span className="font-black text-rose-600 block">{store.variance}</span>
                        <div className="flex items-center justify-end gap-1.5 mt-0.5">
                          <span className="inline-block text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">
                            {store.variancePct}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {store.reason}
                        </p>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => {
                            if (onNavigate) onNavigate('whatif');
                          }}
                          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20 hover:shadow-lg transition-all cursor-pointer active:scale-98"
                        >
                          <span>Mô Phỏng What-If Cứu Doanh Số</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chân bảng ghi chú hành động */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Bấm nút <strong>"Mô Phỏng What-If Cứu Doanh Số"</strong> để chuyển ngay sang Hộp cát Mô phỏng What-If thử nghiệm điều chỉnh Giá bán và Marketing.</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] shrink-0 font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Nguồn đối chiếu: winmart.vn • Cẩm nang mua sắm WinMart Đà Nẵng</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
