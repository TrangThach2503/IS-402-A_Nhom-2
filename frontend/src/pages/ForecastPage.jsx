import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DataIngestModal from '../components/DataIngestModal';
import { 
  prophetTimeSeriesData, 
  forecastSummaryTable 
} from '../services/mockData';
import { 
  BrainCircuit, 
  Sliders, 
  UploadCloud, 
  Play, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Info,
  Calendar,
  Layers,
  Activity,
  Tag,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function ForecastPage({ onLogout, onNavigate, currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunningModel, setIsRunningModel] = useState(false);
  const [modelSuccessMsg, setModelSuccessMsg] = useState('');
  
  // Model parameters state
  const [horizon, setHorizon] = useState('90'); // 30, 60, 90
  const [weeklySeasonality, setWeeklySeasonality] = useState(true);
  const [yearlySeasonality, setYearlySeasonality] = useState(true);
  const [confidenceInterval, setConfidenceInterval] = useState(95);
  const [category, setCategory] = useState('fresh_food');
  const [scope, setScope] = useState('all_danang');

  // Khởi chạy huấn luyện lại mô hình
  const handleRunModel = () => {
    setIsRunningModel(true);
    setModelSuccessMsg('');
    setTimeout(() => {
      setIsRunningModel(false);
      setModelSuccessMsg('Đã hội tụ tối ưu hóa thuật toán Facebook Prophet sau 0.38s! Dải tin cậy 95% đã được tái tính toán.');
      setTimeout(() => setModelSuccessMsg(''), 5000);
    }, 700);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar cố định bên trái */}
      <Sidebar 
        activeTab="forecast" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        currentUser={currentUser} 
      />

      {/* Vùng nội dung chính */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          title="XƯỞNG DỰ BÁO CHUỖI THỜI GIAN AI PROPHET"
          subtitle="Mô hình hóa chuỗi thời gian bằng thuật toán Facebook Prophet & Ước lượng nhu cầu khách quan"
        />

        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Thanh công cụ thao tác hàng đầu */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                  Mô Hình Dự Báo Học Máy • Facebook Prophet v1.1
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-1">
                Ước Lượng Nhu Cầu Tiêu Dùng Chuỗi WinMart & WinMart+ Đà Nẵng
              </h2>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              {/* Nút 1: Mở Modal Nạp Tệp Dữ Liệu Excel */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 transition-all flex items-center space-x-2 cursor-pointer shadow-2xs"
              >
                <UploadCloud className="w-4 h-4 text-blue-600" />
                <span>Nạp Tệp Dữ Liệu (Excel/CSV)</span>
              </button>

              {/* Nút 2: Khởi chạy huấn luyện lại mô hình */}
              <button
                onClick={handleRunModel}
                disabled={isRunningModel}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/25 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-60 active:scale-98"
              >
                {isRunningModel ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Đang Huấn Luyện AI...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Khởi Chạy Dự Báo AI Ngay</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Thông báo thành công sau khi chạy mô hình */}
          {modelSuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center space-x-2.5 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{modelSuccessMsg}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CẤU TRÚC 2 CỘT CHÍNH: BẢNG ĐIỀU KHIỂN THAM SỐ (TRÁI) & KẾT QUẢ ĐỒ THỊ (PHẢI) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --------------------------------------------------------------------- */}
            {/* CỘT TRÁI: BẢNG THAM SỐ MÔ HÌNH HỌC MÁY (4 CỘT)                        */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  THAM SỐ MÔ HÌNH HỌC MÁY
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cấu hình tham số thuật toán học máy Facebook Prophet
                </p>
              </div>

              {/* 1. Chọn Ngành hàng */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Ngành Hàng Trọng Điểm
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors"
                >
                  <option value="fresh_food">Thực phẩm tươi sống (MEATDeli & WinEco) & Nước giải khát</option>
                  <option value="packaged_goods">Hàng tiêu dùng thiết yếu Masan (Gia vị Chinsu, Mì Omachi)</option>
                  <option value="home_personal">Hóa mỹ phẩm & Chăm sóc gia đình WinMart Home</option>
                  <option value="all_categories">Toàn bộ danh mục bán lẻ WinMart</option>
                </select>
              </div>

              {/* 2. Chọn Phạm vi chi nhánh */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Phạm Vi Điểm Bán Đà Nẵng
                </label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors"
                >
                  <option value="all_danang">Toàn Chuỗi Đà Nẵng (32 Điểm Bán: 1 Siêu Thị + 31 Cửa Hàng)</option>
                  <option value="hai_chau">Cụm Quận Hải Châu (12 Điểm Bán)</option>
                  <option value="son_tra">Cụm Quận Sơn Trà & Ngũ Hành Sơn (10 Điểm Bán - Trọng Điểm Du Lịch)</option>
                  <option value="thanh_khe">Cụm Quận Thanh Khê (5 Điểm Bán)</option>
                  <option value="cam_le">Cụm Quận Cẩm Lệ (5 Điểm Bán)</option>
                </select>
              </div>

              {/* 3. Tầm dự báo (Horizon) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Tầm Dự Báo Tương Lai (Forecast Horizon)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '30', label: '30 Ngày', desc: 'Tháng 11' },
                    { id: '60', label: '60 Ngày', desc: 'Tháng 12' },
                    { id: '90', label: '90 Ngày', desc: 'Tết 2027' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHorizon(item.id)}
                      className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                        horizon === item.id
                          ? 'bg-purple-50 text-purple-700 border-purple-300 font-black shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100/80 font-semibold'
                      }`}
                    >
                      <div className="text-xs">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Thành phần Mùa vụ (Seasonality) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  Thành Phần Mùa Vụ (Seasonality Decomposition)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={weeklySeasonality}
                      onChange={(e) => setWeeklySeasonality(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 cursor-pointer"
                    />
                    <span>Mùa vụ theo Tuần (Weekly Pattern - P=7 ngày)</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={yearlySeasonality}
                      onChange={(e) => setYearlySeasonality(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 cursor-pointer"
                    />
                    <span>Mùa vụ theo Năm (Yearly Pattern - P=365 ngày)</span>
                  </label>
                </div>
              </div>

              {/* 5. Sự kiện Đột biến & Biến ngoại sinh (Holiday Regressors) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  Sự Kiện Đột Biến & Lễ Hội Đà Nẵng
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    <Tag className="w-3 h-3 text-amber-600" />
                    <span>Tết Nguyên Đán 2027</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    <Tag className="w-3 h-3 text-blue-600" />
                    <span>Lễ Hội Pháo Hoa DIFF</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Tag className="w-3 h-3 text-emerald-600" />
                    <span>Cẩm Nang Mua Sắm WiN</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                    <Tag className="w-3 h-3 text-rose-600" />
                    <span>Mùa Mưa Bão Miền Trung</span>
                  </span>
                </div>
              </div>

              {/* 6. Dải tin cậy (Confidence Interval) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">Dải Tin Cậy Dự Báo</label>
                  <span className="font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {confidenceInterval}% Độ tin cậy
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="99"
                  value={confidenceInterval}
                  onChange={(e) => setConfidenceInterval(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>80% (Hẹp hơn)</span>
                  <span>95% (Chuẩn Khuyến Nghị)</span>
                  <span>99% (Rộng nhất)</span>
                </div>
              </div>

              {/* Nút hành động áp dụng */}
              <button
                onClick={handleRunModel}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
              >
                Cập Nhật Tham Số & Tái Tính Toán
              </button>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* CỘT PHẢI: KẾT QUẢ DỰ BÁO, SAI SỐ & ĐỒ THỊ CHUỖI THỜI GIAN (8 CỘT)     */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Hàng 3 thẻ Thẩm định Sai số Thuật toán */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Thẻ 1: MAPE */}
                <div className="bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase text-slate-500">
                      Sai Số Tuyệt Đối MAPE
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-2xl font-black text-emerald-700">
                    4.62%
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      RẤT CHÍNH XÁC (&lt; 10%)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Mức kiểm định A+</span>
                  </div>
                </div>

                {/* Thẻ 2: RMSE */}
                <div className="bg-white rounded-3xl p-5 border border-blue-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase text-slate-500">
                      Sai Số Chuẩn RMSE
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="text-2xl font-black text-blue-700">
                    14.28 Tr đ
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                    Độ lệch chuẩn bình quân trên chuỗi ngày
                  </div>
                </div>

                {/* Thẻ 3: Tốc độ huấn luyện */}
                <div className="bg-white rounded-3xl p-5 border border-purple-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase text-slate-500">
                      Thời Gian Khớp Mô Hình
                    </span>
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-black text-purple-700">
                    0.38 Giây
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                    Thuật toán tối ưu hóa L-BFGS hoàn tất
                  </div>
                </div>

              </div>

              {/* Khung Biểu đồ Quỹ đạo Dự báo Tương tác (Prophet Interactive Trajectory) */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                      QUỸ ĐẠO DỰ BÁO NHU CẦU & DẢI TIN CẬY 95% (PROPHET FAN CHART)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Đường dự báo trung tâm (Xanh tím đậm) cùng dải tin cậy 95% thể hiện biên độ dao động thị trường
                    </p>
                  </div>

                  {/* Chú giải nhãn màu */}
                  <div className="flex items-center flex-wrap gap-3 text-[11px] font-semibold text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1 bg-emerald-500 rounded"></span>
                      <span>Thực tế lịch sử</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1.5 bg-purple-600 rounded"></span>
                      <span>Dự báo trung tâm (yhat)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-2 bg-purple-200/60 rounded"></span>
                      <span>Dải tin cậy 95%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1 border-t-2 border-dashed border-amber-500"></span>
                      <span>Kế hoạch ban hành</span>
                    </div>
                  </div>
                </div>

                {/* Khu vực vẽ biểu đồ Recharts */}
                <div className="h-80 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={prophetTimeSeriesData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="prophetConfidence" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.28}/>
                          <stop offset="95%" stopColor="#A855F7" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[1.8, 5.0]} />
                      <Tooltip 
                        formatter={(val, name) => {
                          if (val === null || val === undefined) return ['--', name];
                          return [`${val} Tỷ VNĐ`, name];
                        }}
                        contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                      />
                      
                      {/* Vùng dải tin cậy 95% Cận trên */}
                      <Area 
                        type="monotone" 
                        dataKey="yhatUpper" 
                        name="Cận Trên Tin Cậy (yhat_upper)" 
                        stroke="none" 
                        fill="url(#prophetConfidence)" 
                      />

                      {/* Đường thực tế quá khứ */}
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Doanh Số Thực Tế (Tỷ đ)" 
                        stroke="#10B981" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#10B981' }} 
                      />

                      {/* Đường dự báo trung tâm Prophet */}
                      <Line 
                        type="monotone" 
                        dataKey="yhat" 
                        name="Dự Báo Trung Tâm Prophet (Tỷ đ)" 
                        stroke="#7C3AED" 
                        strokeWidth={3.5} 
                        dot={{ r: 5, fill: '#7C3AED' }} 
                      />

                      {/* Đường mốc kế hoạch */}
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        name="Chỉ Tiêu Kế Hoạch (Tỷ đ)" 
                        stroke="#F59E0B" 
                        strokeWidth={2} 
                        strokeDasharray="4 4" 
                        dot={{ r: 3, fill: '#F59E0B' }} 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Mốc chuyển giao hiện tại: <strong>Tháng 10/2026 (2.45 Tỷ đ)</strong></span>
                  <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    Dự báo Tết Nguyên Đán T01/2027: Đạt 4.30 Tỷ đ (Tăng +18.0%)
                  </span>
                </div>
              </div>

              {/* Bảng Trích xuất Kết quả Dự báo 3 Tháng tới */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                      KẾT QUẢ DỰ BÁO CHI TIẾT 3 THÁNG TỚI CỦA WINMART ĐÀ NẴNG
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bóc tách theo 3 kịch bản xác suất: Cận dưới thận trọng (yhat_lower), Dự báo kỳ vọng (yhat), và Cận trên lạc quan (yhat_upper)
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                        <th className="py-3.5 px-6">Tháng Dự Báo</th>
                        <th className="py-3.5 px-6 text-right">Dự Báo Thận Trọng</th>
                        <th className="py-3.5 px-6 text-right">Dự Báo Kỳ Vọng (yhat)</th>
                        <th className="py-3.5 px-6 text-right">Dự Báo Lạc Quan</th>
                        <th className="py-3.5 px-6 text-center">Tăng Trưởng</th>
                        <th className="py-3.5 px-6">Bối Cảnh Thị Trường Đà Nẵng</th>
                        <th className="py-3.5 px-6 text-center">Thao Tác DSS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {forecastSummaryTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-900">
                            <div>{row.month}</div>
                            <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                              {row.horizon}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-right font-bold text-slate-600">
                            {row.pessimistic.toFixed(2)} Tỷ
                          </td>

                          <td className="py-4 px-6 text-right font-black text-purple-700 text-sm">
                            {row.expected.toFixed(2)} Tỷ
                          </td>

                          <td className="py-4 px-6 text-right font-bold text-emerald-600">
                            {row.optimistic.toFixed(2)} Tỷ
                          </td>

                          <td className="py-4 px-6 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {row.growth}
                            </span>
                          </td>

                          <td className="py-4 px-6 max-w-xs text-xs text-slate-600 leading-relaxed">
                            {row.note}
                          </td>

                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => {
                                if (onNavigate) onNavigate('whatif');
                              }}
                              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm shadow-purple-500/20 hover:shadow-md transition-all cursor-pointer"
                            >
                              <span>Đưa Vào What-If</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Bấm nút <strong>"Đưa Vào What-If"</strong> để sử dụng con số dự báo kỳ vọng này làm mốc cơ sở (Baseline) cho việc kéo thanh trượt thử nghiệm chính sách giá và tiếp thị.</span>
                  </div>
                  <span className="font-semibold text-slate-700 shrink-0">Thuật toán: L-BFGS Optimization</span>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* Modal Popup Nạp Tệp Dữ Liệu Excel / CSV */}
      <DataIngestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onIngestSuccess={() => {
          setIsModalOpen(false);
          handleRunModel();
        }}
      />
    </div>
  );
}
