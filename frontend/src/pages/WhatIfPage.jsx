import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { whatIfScenarios } from '../services/mockData';
import { 
  Sliders, 
  RotateCcw, 
  Save, 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  Percent,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';

export default function WhatIfPage({ onLogout, onNavigate, currentUser }) {
  // Mốc cơ sở cố định (Baseline Constants)
  const Q_BASE = 50000;       // Sản lượng cơ sở (sản phẩm)
  const P_BASE = 25000;       // Giá bán cơ sở (VNĐ)
  const R_BASE = 1250000000;  // Doanh thu gốc (1.25 Tỷ VNĐ)
  const M_BASE = 50000000;    // Ngân sách Marketing gốc (50 Triệu VNĐ)
  const ED = -1.20;           // Hệ số co giãn cầu theo giá
  const BETA_MKT = 0.35;      // Hệ số phản ứng Marketing qua hàm ln

  // Trạng thái thanh trượt & công tắc What-If
  const [deltaP, setDeltaP] = useState(3.0); // +3.0%
  const [deltaM, setDeltaM] = useState(30.0); // +30.0%
  const [envCampaign, setEnvCampaign] = useState(true); // +5% khách du lịch/sinh viên
  const [envCompetitor, setEnvCompetitor] = useState(false); // -4% cạnh tranh đối thủ
  const [selectedScenarioId, setSelectedScenarioId] = useState('optimal');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Hàm tính toán kinh tế vi mô tức thì (Real-time DSS Microeconomic Engine)
  const simulatedResults = useMemo(() => {
    const p_new = Math.round(P_BASE * (1 + deltaP / 100));
    const m_new = Math.round(M_BASE * (1 + deltaM / 100));

    // Hệ số tác động giá: (1 + Ed * deltaP%)
    const priceEffect = 1 + ED * (deltaP / 100);

    // Hệ số tác động Marketing: (1 + beta_mkt * ln(1 + deltaM%))
    const mktFraction = Math.max(-0.95, deltaM / 100);
    const mktEffect = 1 + BETA_MKT * Math.log(1 + mktFraction);

    // Tác động ngoại cảnh Đà Nẵng
    const envEffect = 1 + (envCampaign ? 0.05 : 0) - (envCompetitor ? 0.04 : 0);

    // Sản lượng mới Q_new
    const q_new = Math.round(Q_BASE * Math.max(0.2, priceEffect) * Math.max(0.5, mktEffect) * envEffect);

    // Doanh thu mới R_new
    const r_new = Math.round(q_new * p_new);

    // Chi phí giá vốn hàng bán COGS ước lượng 60% giá cơ sở + chi phí Marketing
    const cogs = q_new * (P_BASE * 0.60);
    const grossProfit = Math.round(r_new - cogs - m_new);

    // Chênh lệch so với gốc
    const deltaR = r_new - R_BASE;
    const deltaRPct = ((deltaR / R_BASE) * 100).toFixed(2);
    const deltaQ = q_new - Q_BASE;
    const deltaQPct = ((deltaQ / Q_BASE) * 100).toFixed(2);
    const netProfitGain = grossProfit - 350000000; // 350 Tr là lợi nhuận gốc

    return {
      p_new,
      m_new,
      q_new,
      r_new,
      grossProfit,
      deltaR,
      deltaRPct,
      deltaQ,
      deltaQPct,
      netProfitGain
    };
  }, [deltaP, deltaM, envCampaign, envCompetitor]);

  // Dữ liệu cho biểu đồ cột so sánh Recharts
  const comparisonChartData = [
    { name: 'Kế Hoạch Cơ Sở', revenue: 1.250, color: '#94A3B8' },
    { name: 'Dự Báo AI Tự Nhiên', revenue: 1.310, color: '#38BDF8' },
    { name: 'Kịch Bản What-If Mới', revenue: Number((simulatedResults.r_new / 1000000000).toFixed(3)), color: '#8B5CF6' },
  ];

  // Khôi phục mặc định
  const handleResetDefault = () => {
    setDeltaP(0);
    setDeltaM(0);
    setEnvCampaign(false);
    setEnvCompetitor(false);
  };

  // Lưu kịch bản
  const handleSaveScenario = () => {
    setSaveSuccessMsg('Đã lưu thành công Kịch bản What-If mới vào cơ sở dữ liệu DSS!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Áp dụng nhanh từ kịch bản mẫu
  const handleSelectScenarioPreset = (scenario) => {
    setSelectedScenarioId(scenario.id);
    setDeltaP(scenario.deltaP);
    setDeltaM(scenario.deltaM);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar cố định bên trái */}
      <Sidebar 
        activeTab="whatif" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        currentUser={currentUser} 
      />

      {/* Vùng nội dung chính */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          title="HỘP CÁT MÔ PHỎNG WHAT-IF & LỰA CHỌN KỊCH BẢN"
          subtitle="Tương tác kéo thanh trượt để lượng hóa phản ứng thị trường và phê duyệt phương án kinh doanh tối ưu"
        />

        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Thanh công cụ tiêu đề & Hành động lưu */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                  Hộp Cát Giả Lập Quyết Định (What-If Sandbox) • Simon's Choice Phase
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-1">
                Mô Phỏng Độ Co Giãn Cầu & Tối Ưu Hóa Biên Lợi Nhuận WinMart Đà Nẵng
              </h2>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={handleResetDefault}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200/80 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi Phục Mặc Định</span>
              </button>

              <button
                onClick={handleSaveScenario}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/25 transition-all flex items-center space-x-2 cursor-pointer active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Kịch Bản Mới</span>
              </button>
            </div>
          </div>

          {/* Thông báo lưu thành công */}
          {saveSuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center space-x-2.5 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CẤU TRÚC 2 CỘT TƯƠNG TÁC THỜI GIAN THỰC (REAL-TIME REACTIVE LAYOUT)        */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --------------------------------------------------------------------- */}
            {/* CỘT TRÁI: BẢNG ĐIỀU KHIỂN THANH TRƯỢT THAM SỐ WHAT-IF (5 CỘT)         */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  BẢNG ĐIỀU KHIỂN THANH TRƯỢT WHAT-IF
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kéo thanh trượt để thay đổi giá niêm yết và ngân sách tiếp thị
                </p>
              </div>

              {/* 1. Mốc Doanh thu Cơ sở (Baseline Reference) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>MỐC THAM CHIẾU CƠ SỞ (BASELINE)</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Quý 1 / 2027</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-[10px] text-slate-400 font-semibold">Sản Lượng (Q)</div>
                    <div className="text-xs font-black text-slate-800 mt-0.5">50,000 sp</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-[10px] text-slate-400 font-semibold">Giá Cơ Sở (P)</div>
                    <div className="text-xs font-black text-slate-800 mt-0.5">25,000 đ</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-[10px] text-slate-400 font-semibold">Doanh Thu (R)</div>
                    <div className="text-xs font-black text-blue-700 mt-0.5">1.250 Tỷ đ</div>
                  </div>
                </div>
              </div>

              {/* 2. Thanh trượt 1: ĐIỀU CHỈNH GIÁ BÁN NIÊM YẾT (ΔP%) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-blue-600" />
                    <span>Điều Chỉnh Giá Bán Niêm Yết (&Delta;P%)</span>
                  </label>
                  <span className={`font-black px-2.5 py-0.5 rounded-lg border text-xs ${
                    deltaP > 0 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : deltaP < 0 
                      ? 'bg-rose-50 text-rose-800 border-rose-200' 
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {deltaP > 0 ? `+${deltaP.toFixed(1)}%` : `${deltaP.toFixed(1)}%`}
                  </span>
                </div>

                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="0.5"
                  value={deltaP}
                  onChange={(e) => setDeltaP(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold text-[11px]">-20% (Giảm giá)</span>
                  <span className="font-bold text-slate-800 text-xs">
                    Giá mới: <strong className="text-blue-700">{simulatedResults.p_new.toLocaleString('vi-VN')} đ/sp</strong>
                  </span>
                  <span className="text-slate-400 font-semibold text-[11px]">+20% (Tăng giá)</span>
                </div>

                <div className="text-[11px] text-slate-500 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Hệ số co giãn cầu <strong>E_d = -1.20</strong> (Cầu nhạy cảm: Tăng giá 1% làm giảm 1.2% lượng bán).</span>
                </div>
              </div>

              {/* 3. Thanh trượt 2: ĐIỀU CHỈNH NGÂN SÁCH MARKETING (ΔM%) */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                    <span>Điều Chỉnh Ngân Sách Marketing (&Delta;M%)</span>
                  </label>
                  <span className="font-black bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-lg text-xs">
                    {deltaM > 0 ? `+${deltaM.toFixed(1)}%` : `${deltaM.toFixed(1)}%`}
                  </span>
                </div>

                <input
                  type="range"
                  min="-50"
                  max="100"
                  step="5"
                  value={deltaM}
                  onChange={(e) => setDeltaM(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold text-[11px]">-50% (Cắt giảm)</span>
                  <span className="font-bold text-slate-800 text-xs">
                    MKT mới: <strong className="text-purple-700">{(simulatedResults.m_new / 1000000).toFixed(1)} Tr đ</strong>
                  </span>
                  <span className="text-slate-400 font-semibold text-[11px]">+100% (Gấp đôi)</span>
                </div>

                <div className="text-[11px] text-slate-500 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Hệ số phản ứng Marketing <strong>&beta;_mkt = 0.35</strong> (Mô hình hàm Logarithmic chống bão hòa quảng cáo).</span>
                </div>
              </div>

              {/* 4. Công tắc Switch Toggles (Môi trường Đà Nẵng) */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Biến Ngoại Sinh Thị Trường Đà Nẵng
                </div>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 cursor-pointer transition-colors">
                  <span className="text-xs font-semibold text-slate-700 pr-2">
                    Lễ Hội Mua Sắm / Mùa Du Lịch Đà Nẵng (+5% khách)
                  </span>
                  <input
                    type="checkbox"
                    checked={envCampaign}
                    onChange={(e) => setEnvCampaign(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 cursor-pointer transition-colors">
                  <span className="text-xs font-semibold text-slate-700 pr-2">
                    Áp Lực Đối Thủ Cạnh Tranh Giảm Giá Sốc (-4% sản lượng)
                  </span>
                  <input
                    type="checkbox"
                    checked={envCompetitor}
                    onChange={(e) => setEnvCompetitor(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
                  />
                </label>
              </div>

              {/* 5. Khung Công thức Kinh tế Vi mô DSS */}
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/80 text-[11px] font-mono text-purple-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1 mb-1 font-sans text-purple-950">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Công thức mô hình hóa DSS:</span>
                </div>
                <code>Q_new = Q_base &times; (1 + E_d &times; &Delta;P%) &times; (1 + &beta;_mkt &times; ln(1 + &Delta;M%))</code>
              </div>

            </div>

            {/* --------------------------------------------------------------------- */}
            {/* CỘT PHẢI: KẾT QUẢ MÔ PHỎNG, KHUYẾN NGHỊ AI & MA TRẬN KỊCH BẢN (7 CỘT) */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Hàng Thẻ KPI Phản hồi Thời gian thực */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Thẻ Doanh Thu Mới */}
                <div className="bg-white rounded-3xl p-5 border border-indigo-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase text-slate-500">
                      Doanh Thu Dự Kiến Mới
                    </div>
                    <div className="text-2xl font-black text-indigo-700 mt-1">
                      {(simulatedResults.r_new / 1000000000).toFixed(3)} Tỷ đ
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      simulatedResults.deltaR >= 0 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {simulatedResults.deltaR >= 0 ? `+${simulatedResults.deltaRPct}%` : `${simulatedResults.deltaRPct}%`}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {simulatedResults.deltaR >= 0 ? `+${(simulatedResults.deltaR / 1000000).toFixed(1)} Tr` : `${(simulatedResults.deltaR / 1000000).toFixed(1)} Tr`}
                    </span>
                  </div>
                </div>

                {/* Thẻ Sản Lượng Bán Mới */}
                <div className="bg-white rounded-3xl p-5 border border-blue-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase text-slate-500">
                      Sản Lượng Tiêu Thụ
                    </div>
                    <div className="text-2xl font-black text-blue-700 mt-1">
                      {simulatedResults.q_new.toLocaleString('vi-VN')} sp
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      simulatedResults.deltaQ >= 0 
                        ? 'bg-blue-50 text-blue-800 border-blue-200' 
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {simulatedResults.deltaQ >= 0 ? `+${simulatedResults.deltaQPct}%` : `${simulatedResults.deltaQPct}%`}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {simulatedResults.deltaQ >= 0 ? `+${simulatedResults.deltaQ.toLocaleString('vi-VN')} sp` : `${simulatedResults.deltaQ.toLocaleString('vi-VN')} sp`}
                    </span>
                  </div>
                </div>

                {/* Thẻ Lợi Nhuận Gộp Ước Tính */}
                <div className="bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase text-slate-500">
                      Lợi Nhuận Gộp Ước Tính
                    </div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">
                      {(simulatedResults.grossProfit / 1000000).toFixed(1)} Tr đ
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      TĂNG RÒNG +{(simulatedResults.netProfitGain / 1000000).toFixed(1)} Tr
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Sau trừ MKT</span>
                  </div>
                </div>

              </div>

              {/* 2. KHỐI CHÚ GIẢI KHUYẾN NGHỊ THÔNG MINH CỦA AI (AI DECISION EXPLANATION BOX - ĐIỂM NHẤN DSS) */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FAF5FF] via-[#F5F3FF] to-[#EFF6FF] border-2 border-purple-300 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/25 mt-0.5">
                  <Lightbulb className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                  <div className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <span>KHUYẾN NGHỊ TỪ TRỢ LÝ THÔNG MINH SALESDSS:</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold border border-purple-200">
                      TỐI ƯU HÓA PARETO
                    </span>
                  </div>
                  <p>
                    Kịch bản <strong className="text-purple-900">Tăng giá nhẹ +3.0%</strong> kết hợp <strong className="text-purple-900">Tăng Ngân sách Marketing +30%</strong> mang lại doanh thu cao nhất đạt <strong>{(simulatedResults.r_new / 1000000000).toFixed(3)} Tỷ VNĐ</strong> và thặng dư lợi nhuận ròng tăng thêm <strong>+{(simulatedResults.netProfitGain / 1000000).toFixed(1)} Triệu VNĐ</strong> sau khi đã bù đắp hoàn toàn chi phí tiếp thị.
                  </p>
                  <p className="text-slate-600 bg-white/70 p-2.5 rounded-xl border border-purple-100 text-[11px]">
                    <strong>Khuyến nghị đặc thù Đà Nẵng:</strong> Tại các chi nhánh sinh viên (Liên Chiểu & Ngũ Hành Sơn), lượng mua có thể giảm nhẹ 3.5% do nhạy cảm giá. Đề xuất: Ban Giám đốc phê duyệt kịch bản này nhưng áp dụng voucher giảm 5% riêng cho nhóm Hội viên WiN là học sinh - sinh viên.
                  </p>
                </div>
              </div>

              {/* 3. Biểu đồ Cột So sánh Doanh thu (Recharts Bar Chart) */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                      SO SÁNH DOANH THU 3 PHƯƠNG ÁN (TỶ VNĐ)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      So sánh giữa Kế hoạch ban đầu, Dự báo khách quan tự nhiên của AI và Kịch bản sau mô phỏng
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                    Phản hồi thời gian thực
                  </span>
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonChartData} margin={{ top: 15, right: 15, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0.8, 1.6]} />
                      <Tooltip 
                        formatter={(val) => [`${val} Tỷ VNĐ`, 'Doanh Thu Kỳ Vọng']}
                        contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="revenue" radius={[10, 10, 0, 0]}>
                        {comparisonChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 4. MA TRẬN SO SÁNH 3 KỊCH BẢN ĐỂ RA QUYẾT ĐỊNH (DECISION CHOICE MATRIX) */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                      MA TRẬN SO SÁNH 3 PHƯƠNG ÁN HÀNH ĐỘNG CHIẾN LƯỢC
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Đánh giá đa tiêu chí giữa giá bán, ngân sách tiếp thị, sản lượng và rủi ro thị trường
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Lựa chọn phương án
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-5">Chọn</th>
                        <th className="py-3 px-5">Tên Phương Án</th>
                        <th className="py-3 px-5 text-right">Giá Bán Niêm Yết</th>
                        <th className="py-3 px-5 text-right">Ngân Sách MKT</th>
                        <th className="py-3 px-5 text-right">Doanh Thu Kỳ Vọng</th>
                        <th className="py-3 px-5 text-right">Lợi Nhuận Ròng</th>
                        <th className="py-3 px-5">Đánh Giá & Rủi Ro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {whatIfScenarios.map((sc) => {
                        const isSelected = selectedScenarioId === sc.id;
                        return (
                          <tr 
                            key={sc.id} 
                            onClick={() => handleSelectScenarioPreset(sc)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? 'bg-purple-50/70 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <td className="py-3.5 px-5 text-center">
                              <input
                                type="radio"
                                checked={isSelected}
                                onChange={() => handleSelectScenarioPreset(sc)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                              />
                            </td>

                            <td className="py-3.5 px-5">
                              <div className="flex items-center gap-1.5">
                                <span>{sc.name}</span>
                                {sc.recommended && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-600 text-white shadow-2xs">
                                    AI ĐỀ XUẤT
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3.5 px-5 text-right">
                              {sc.priceFormatted}
                            </td>

                            <td className="py-3.5 px-5 text-right">
                              {sc.mktFormatted}
                            </td>

                            <td className="py-3.5 px-5 text-right font-black text-indigo-700">
                              {(sc.revenue / 1000000000).toFixed(3)} Tỷ
                            </td>

                            <td className="py-3.5 px-5 text-right font-black text-emerald-700">
                              {(sc.profit / 1000000).toFixed(0)} Tr đ
                            </td>

                            <td className="py-3.5 px-5 max-w-xs text-[11px] text-slate-500">
                              {sc.risk}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đang lựa chọn: <strong>{whatIfScenarios.find(s => s.id === selectedScenarioId)?.name}</strong></span>
                  </span>
                  <span className="font-semibold text-slate-700">Dữ liệu tối ưu theo điều kiện thị trường Đà Nẵng</span>
                </div>
              </div>

              {/* 5. NÚT TOÀN CHIỀU RỘNG: PHÊ DUYỆT & CHUYỂN TIẾP SANG PHÂN BỔ QUOTA */}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('quota');
                }}
                className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 hover:from-blue-800 hover:to-purple-800 shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2 active:scale-99"
              >
                <span>PHÊ DUYỆT KỊCH BẢN TỐI ƯU NÀY & CHUYỂN SANG PHÂN BỔ CHỈ TIÊU QUOTA</span>
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
