import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function WaterfallChart({ items }) {
  // Tỷ lệ trực quan hóa chuẩn BI:
  // Baseline (Kế hoạch) = 60% chiều cao
  // Mỗi 1 Tỷ chênh lệch = 10% chiều cao biểu đồ để người quản trị dễ dàng nhìn thấy độ lớn
  const baseHeight = 58;
  const scale = 11;

  // Tính toán vị trí đáy và chiều cao % cho từng cột
  let currentTop = baseHeight;
  const computedItems = items.map((item) => {
    let bottom = 0;
    let height = 0;

    if (item.type === 'baseline') {
      bottom = 0;
      height = baseHeight;
      currentTop = baseHeight;
    } else if (item.type === 'positive') {
      bottom = currentTop;
      height = Math.max(7, item.diff * scale);
      currentTop = bottom + height;
    } else if (item.type === 'negative') {
      height = Math.max(6, Math.abs(item.diff) * scale);
      bottom = currentTop - height;
      currentTop = bottom;
    } else if (item.type === 'total') {
      bottom = 0;
      height = currentTop;
    }

    return {
      ...item,
      bottomPct: bottom,
      heightPct: height,
    };
  });

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(148,163,184,0.08)] flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            BÓC TÁCH NGUYÊN NHÂN LỆCH KẾ HOẠCH
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              WATERFALL VARIANCE
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân rã các yếu tố cấu thành chênh lệch giữa Kế hoạch (26.60 Tỷ) và Thực tế (28.45 Tỷ)
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
            <span>Tăng (+1.85 Tỷ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
            <span>Giảm (-0.55 Tỷ)</span>
          </div>
        </div>
      </div>

      {/* Biểu đồ Thác nước dạng thanh nổi trực quan */}
      <div className="pt-8 pb-2 flex-1 flex flex-col justify-end">
        <div className="h-64 flex items-end justify-between gap-3 px-3 border-b border-slate-200 relative">
          
          {/* Lưới grid ngang phụ */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
            <div className="border-b border-dashed border-slate-200 w-full"></div>
            <div className="border-b border-dashed border-slate-200 w-full"></div>
            <div className="border-b border-dashed border-slate-200 w-full"></div>
            <div className="border-b border-dashed border-slate-200 w-full"></div>
          </div>

          {computedItems.map((item, idx) => {
            const isPos = item.type === 'positive';
            const isNeg = item.type === 'negative';
            const isTotal = item.type === 'total';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                
                {/* Giá trị trên đầu cột */}
                <div 
                  className="absolute text-[11px] font-black transition-transform group-hover:-translate-y-1 tracking-tight"
                  style={{ 
                    bottom: `${Math.min(94, item.bottomPct + item.heightPct + 2.5)}%`,
                    color: isPos ? '#059669' : isNeg ? '#DC2626' : '#1E293B'
                  }}
                >
                  {isPos && '+'}
                  {item.diff ? `${item.diff} Tỷ` : `${item.value} Tỷ`}
                </div>

                {/* Thanh cột Waterfall */}
                <div 
                  className="w-full max-w-[56px] rounded-xl transition-all duration-300 group-hover:brightness-95 relative shadow-xs"
                  style={{
                    height: `${item.heightPct}%`,
                    marginBottom: `${item.bottomPct}%`,
                    backgroundColor: item.color,
                    boxShadow: isTotal ? '0 4px 14px rgba(37,99,235,0.28)' : 'none'
                  }}
                >
                  {/* Đường kẻ đứt nối giữa các bước sang cột tiếp theo */}
                  {idx < computedItems.length - 1 && (
                    <div 
                      className="absolute top-0 right-0 w-8 border-t border-dashed border-slate-300 pointer-events-none z-10"
                      style={{ right: '-50%' }}
                    ></div>
                  )}
                </div>

                {/* Nhãn chân cột */}
                <div className="text-[11px] font-bold text-slate-600 text-center mt-3 truncate w-full px-0.5 leading-tight">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chú giải tổng kết nguyên nhân */}
      <div className="mt-4 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100/80 text-xs text-slate-700 flex items-start space-x-2.5">
        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
          i
        </div>
        <p className="leading-relaxed">
          <strong className="text-slate-900">Kết luận DSS:</strong> Doanh số chuỗi WinMart+ Đà Nẵng thực tế vượt kế hoạch <span className="text-emerald-700 font-bold">+1.85 Tỷ VNĐ (+6.9%)</span>. Trong đó, động lực chính đến từ <strong>Tăng sản lượng tiêu dùng (+1.4 Tỷ)</strong> và <strong>Chiến dịch Hội viên WiN (+1.0 Tỷ)</strong>, bù đắp hoàn toàn cho mức trợ giá rau củ WinEco & hụt hàng tổng kho mùa mưa bão miền Trung (-0.55 Tỷ).
        </p>
      </div>
    </div>
  );
}
