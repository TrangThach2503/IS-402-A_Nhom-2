import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { initialQuotaStores } from '../services/mockData';
import { 
  Target, 
  Calculator, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  ShieldCheck, 
  Award, 
  Layers, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles,
  Send
} from 'lucide-react';

export default function QuotaPage({ onLogout, onNavigate, currentUser }) {
  // Tổng chỉ tiêu kế hoạch toàn chuỗi (T_total)
  const [totalTarget, setTotalTarget] = useState(3000000000); // 3 Tỷ VNĐ
  const [targetQuarter, setTargetQuarter] = useState('q1_2027');
  
  // Trạng thái hệ số tiềm năng vùng Gi của từng chi nhánh
  const [stores, setStores] = useState(initialQuotaStores);
  
  // Trạng thái phê duyệt & ban hành kế hoạch
  const [planStatus, setPlanStatus] = useState('DRAFT'); // 'DRAFT' | 'OFFICIAL'
  const [signMessage, setSignMessage] = useState('');

  // Hàm cập nhật hệ số Gi
  const handleGrowthFactorChange = (storeId, newFactor) => {
    setStores(prev => prev.map(s => {
      if (s.id === storeId) {
        return { ...s, growthFactor: Math.max(0.1, Number(newFactor) || 1.0) };
      }
      return s;
    }));
  };

  // Tính toán ma trận phân bổ chuẩn hóa & Bảo toàn 100% ngân sách (Conservation Algorithm)
  const calculatedQuota = useMemo(() => {
    // 1. Tính Ki = Wi * Gi cho từng cửa hàng
    const storesWithKi = stores.map(s => {
      const ki = s.histWeight * s.growthFactor;
      return { ...s, ki };
    });

    // 2. Tính tổng Sigma K
    const sumK = storesWithKi.reduce((acc, curr) => acc + curr.ki, 0);

    // 3. Tính tỷ lệ chuẩn hóa Pi = Ki / sumK (%) và Target_i chưa làm tròn
    let allocatedSum = 0;
    const computed = storesWithKi.map((s, index) => {
      const normalizedRatio = s.ki / sumK;
      // Làm tròn đến hàng nghìn đồng
      let target_i = Math.round((totalTarget * normalizedRatio) / 1000) * 1000;
      allocatedSum += target_i;

      // Tốc độ tăng trưởng so với cùng kỳ (Lấy doanh số lịch sử chia 4 quý)
      const samePeriodLastYear = s.histSales / 4;
      const growthYoY = (((target_i - samePeriodLastYear) / samePeriodLastYear) * 100).toFixed(1);

      return {
        ...s,
        normalizedRatio: (normalizedRatio * 100).toFixed(2),
        target_i,
        growthYoY: Number(growthYoY) > 0 ? `+${growthYoY}%` : `${growthYoY}%`
      };
    });

    // 4. Thuật toán bù trừ số dư lẻ để đảm bảo 100.00% bảo toàn ngân sách (Conservation Check)
    const discrepancy = totalTarget - allocatedSum;
    if (discrepancy !== 0 && computed.length > 0) {
      computed[0].target_i += discrepancy; // Bù số lẻ vào điểm bán đầu tàu
    }

    const finalAllocatedSum = computed.reduce((acc, curr) => acc + curr.target_i, 0);
    const totalHistSales = stores.reduce((acc, curr) => acc + curr.histSales, 0);

    return {
      storeList: computed,
      sumK: sumK.toFixed(3),
      finalAllocatedSum,
      totalHistSales,
      discrepancy: totalTarget - finalAllocatedSum
    };
  }, [stores, totalTarget]);

  // Phê duyệt và ban hành kế hoạch
  const handleApprovePlan = () => {
    setPlanStatus('OFFICIAL');
    setSignMessage('Đã ban hành thành công chỉ tiêu Quota Quý 1/2027! Hệ thống tự động gửi thông báo đến 32 Cửa hàng trưởng WinMart Đà Nẵng.');
    setTimeout(() => setSignMessage(''), 6000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar cố định bên trái */}
      <Sidebar 
        activeTab="quota" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        currentUser={currentUser} 
      />

      {/* Vùng nội dung chính */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          title="MA TRẬN PHÂN BỔ CHỈ TIÊU DOANH SỐ & PHÊ DUYỆT KẾ HOẠCH"
          subtitle="Tự động phân bổ chỉ tiêu Quota theo trọng số lịch sử (Wi) & Tiềm năng vùng (Gi), bảo toàn 100% ngân sách tài chính"
        />

        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Thông báo ban hành thành công */}
          {signMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center space-x-2.5 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{signMessage}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 1. KHỐI CẤU HÌNH TỔNG CHỈ TIÊU ĐIỀU HÀNH TOÀN CHUỖI                       */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Ô nhập tổng chỉ tiêu T_total */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                  Tổng Chỉ Tiêu Kế Hoạch Giao (T_total)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="100000000"
                    value={totalTarget}
                    onChange={(e) => setTotalTarget(Number(e.target.value))}
                    className="pl-3.5 pr-14 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base font-black text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 shadow-2xs"
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-400">VNĐ</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500">
                  Tương đương: <strong>{(totalTarget / 1000000000).toFixed(2)} Tỷ VNĐ</strong>
                </div>
              </div>

              {/* Dropdown chọn kỳ kế hoạch */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                  Kỳ Kế Hoạch Phân Bổ
                </label>
                <select
                  value={targetQuarter}
                  onChange={(e) => setTargetQuarter(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
                >
                  <option value="q1_2027">Quý 1 / Năm 2027 (01/01/2027 - 31/03/2027) • Mua Sắm Tết</option>
                  <option value="q2_2027">Quý 2 / Năm 2027 (01/04/2027 - 30/06/2027) • Du Lịch Hè</option>
                  <option value="q3_2027">Quý 3 / Năm 2027 (01/07/2027 - 30/09/2027) • Hội Viên WiN</option>
                  <option value="q4_2027">Quý 4 / Năm 2027 (01/10/2027 - 31/12/2027) • Cuối Năm</option>
                </select>
                <div className="text-[11px] text-slate-400 font-medium">
                  Thời hạn thực thi: 90 ngày
                </div>
              </div>
            </div>

            {/* Huy hiệu phương pháp phân bổ */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs">
                <div className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
                  Thuật Toán Phân Bổ Quota
                </div>
                <div className="font-bold text-emerald-950 mt-0.5">
                  Đa Tiêu Chí: Trọng Số Lịch Sử (Wi) &times; Tiềm Năng Vùng (Gi)
                </div>
              </div>

              <button
                onClick={() => setStores(initialQuotaStores)}
                className="px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer shadow-2xs flex items-center justify-center space-x-1.5"
              >
                <Calculator className="w-4 h-4 text-slate-600" />
                <span>Tự Động Tính Toán Lại</span>
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 2. MA TRẬN BẢNG TÍNH PHÂN BỔ CHỈ TIÊU QUOTA CHI TIẾT                       */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                  BẢNG MA TRẬN PHÂN BỔ CHỈ TIÊU QUOTA TỪNG ĐIỂM BÁN
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    BẢO TOÀN 100% NGÂN SÁCH
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hệ số tiềm năng Gi cho phép người điều hành tinh chỉnh trực tiếp theo đặc thù từng quận của Đà Nẵng
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sai Lệch Kiểm Định Ngân Sách: <strong>0 VNĐ</strong></span>
              </div>
            </div>

            {/* Bảng ma trận phân bổ */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F1F5F9] border-b border-slate-200 text-[11px] font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4 text-center">Mã Đơn Vị</th>
                    <th className="py-3.5 px-5">Tên Chi Nhánh & Phân Loại Điểm Bán</th>
                    <th className="py-3.5 px-4 text-right">Doanh Số 12T (V_i)</th>
                    <th className="py-3.5 px-4 text-center">Trọng Số W_i</th>
                    <th className="py-3.5 px-4 text-center">Hệ Số Vùng (G_i)</th>
                    <th className="py-3.5 px-4 text-center">Tích Số K_i</th>
                    <th className="py-3.5 px-4 text-center">Tỷ Lệ P_i (%)</th>
                    <th className="py-3.5 px-5 text-right bg-blue-50/50">Chỉ Tiêu Quý Tới (Target_i)</th>
                    <th className="py-3.5 px-4 text-center">Tăng Trưởng YoY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculatedQuota.storeList.map((store) => (
                    <tr key={store.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Mã đơn vị */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                        <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-[11px]">
                          {store.id}
                        </span>
                      </td>

                      {/* Tên & phân loại */}
                      <td className="py-4 px-5">
                        <div className="font-extrabold text-slate-900">{store.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            store.typeColor === 'blue' 
                              ? 'bg-blue-50 text-blue-700 border-blue-200' 
                              : store.typeColor === 'emerald'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {store.typeBadge}
                          </span>
                          <span className="text-[11px] text-slate-400">Quận: {store.district}</span>
                        </div>
                      </td>

                      {/* Doanh số lịch sử 12 tháng */}
                      <td className="py-4 px-4 text-right font-bold text-slate-700 font-mono">
                        {store.histSales.toLocaleString('vi-VN')} đ
                      </td>

                      {/* Trọng số lịch sử Wi */}
                      <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                        {(store.histWeight * 100).toFixed(2)}%
                      </td>

                      {/* Ô nhập Hệ số tiềm năng Gi */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <input
                            type="number"
                            step="0.05"
                            min="0.5"
                            max="2.0"
                            value={store.growthFactor}
                            onChange={(e) => handleGrowthFactorChange(store.id, e.target.value)}
                            className="w-16 text-center py-1 bg-white border border-slate-300 focus:border-blue-500 rounded-lg font-black text-xs text-blue-800 focus:outline-none shadow-2xs"
                          />
                        </div>
                      </td>

                      {/* Tích số Ki */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-purple-700">
                        {store.ki.toFixed(3)}
                      </td>

                      {/* Tỷ lệ chuẩn hóa Pi */}
                      <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                        {store.normalizedRatio}%
                      </td>

                      {/* Chỉ tiêu giao Quý tới Target_i */}
                      <td className="py-4 px-5 text-right font-black text-blue-700 text-sm font-mono bg-blue-50/40">
                        {store.target_i.toLocaleString('vi-VN')} đ
                      </td>

                      {/* Tăng trưởng YoY */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {store.growthYoY}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

                {/* DÒNG TỔNG CỘNG KIỂM TRA BẢO TOÀN (CONSERVATION CHECK ROW) */}
                <tfoot>
                  <tr className="bg-[#DCFCE7] border-t-2 border-emerald-300 font-black text-slate-900 text-xs">
                    <td className="py-4 px-4 text-center uppercase tracking-wider text-emerald-800 font-mono">
                      TỔNG CỘNG
                    </td>
                    <td className="py-4 px-5 font-black text-emerald-950">
                      TOÀN BỘ CHUỖI CỬA HÀNG ĐÀ NẴNG
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-black text-slate-900">
                      {calculatedQuota.totalHistSales.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-4 px-4 text-center font-black">
                      100.00%
                    </td>
                    <td className="py-4 px-4 text-center text-slate-400 font-normal">
                      &mdash;
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-black text-purple-900">
                      {calculatedQuota.sumK}
                    </td>
                    <td className="py-4 px-4 text-center font-black text-emerald-950">
                      100.00%
                    </td>
                    <td className="py-4 px-5 text-right font-black text-emerald-900 text-sm font-mono bg-emerald-100/60">
                      {calculatedQuota.finalAllocatedSum.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-800 font-black">
                      KHỚP 100.00%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cơ chế làm tròn & khử số lẻ tự động bù trừ vào điểm bán đầu tàu, bảo đảm <strong>100% ngân sách tài chính</strong> không bị thâm hụt.</span>
              </div>
              <span className="font-semibold text-slate-700">Trạng thái số học: Không có sai lệch</span>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 3. KHỐI TRÌNH DUYỆT, KÝ SỐ ĐIỆN TỬ & BAN HÀNH QUYẾT ĐỊNH                   */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Cột trái: Trạng thái & Chữ ký số */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">Trạng thái hồ sơ:</span>
                {planStatus === 'DRAFT' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>KẾ HOẠCH ĐANG Ở TRẠNG THÁI DỰ THẢO (DRAFT v1.2)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ĐÃ BAN HÀNH CHÍNH THỨC (OFFICIAL)</span>
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div>Người lập kế hoạch: <strong>Thạch Hoài Trang (Chuyên viên Kế hoạch / Nhóm trưởng)</strong></div>
                <div className="flex items-center gap-2">
                  <span>Chữ ký số Giám đốc Kinh doanh:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 font-mono text-[11px] font-bold border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>TOKEN-SECURE-DSS-2026-WINMART-Q1</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Cột phải: Nhóm nút hành động xuất file & Phê duyệt */}
            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={() => alert('Đang xuất ma trận phân bổ sang tệp Excel (.xlsx)...')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Xuất Tệp Excel Phân Bổ (XLSX)</span>
              </button>

              <button
                onClick={() => alert('Đang tạo và tải về Nghị quyết Kế hoạch Bán hàng định dạng PDF...')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Xuất Nghị Quyết DSS (PDF)</span>
              </button>

              <button
                onClick={handleApprovePlan}
                disabled={planStatus === 'OFFICIAL'}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-60 active:scale-98"
              >
                <Award className="w-4 h-4" />
                <span>{planStatus === 'OFFICIAL' ? 'ĐÃ BAN HÀNH THÀNH CÔNG' : 'PHÊ DUYỆT & BAN HÀNH CHỈ TIÊU CHÍNH THỨC'}</span>
              </button>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
