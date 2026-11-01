import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  Database, 
  AlertCircle,
  FileText
} from 'lucide-react';

export default function DataIngestModal({ isOpen, onClose, onIngestSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [selectedFileName, setSelectedFileName] = useState('WinMart_DaNang_POS_Transactions_Q3_2026.xlsx');

  if (!isOpen) return null;

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(20);
    setTimeout(() => setUploadProgress(60), 300);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      if (onIngestSuccess) {
        onIngestSuccess();
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-purple-50/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                NẠP DỮ LIỆU BÁN HÀNG VÀO KHO DỮ LIỆU ĐA CHIỀU (OLAP)
              </h2>
              <p className="text-xs text-slate-500">
                Chuỗi Cửa Hàng WinMart & WinMart+ Đà Nẵng • Masan WinCommerce
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Vùng kéo thả tệp Drag & Drop Zone */}
          <div 
            onClick={handleSimulateUpload}
            className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-8 text-center transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 shadow-md shadow-blue-500/10 flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <div className="text-sm font-black text-slate-800">
              Kéo thả tệp dữ liệu bán hàng (.xlsx, .csv) vào đây
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Hoặc <span className="text-blue-600 font-bold hover:underline">bấm để duyệt tệp từ máy tính</span> (Dung lượng tối đa 50MB)
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Tệp hiện tại: <strong>{selectedFileName}</strong> (4.2 MB)</span>
            </div>
          </div>

          {/* Cấu trúc schema các cột bắt buộc */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>Cấu trúc 6 cột chuẩn định dạng nạp kho OLAP:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold text-slate-600">
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-blue-700">NgayGiaoDich</span>
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-blue-700">MaChiNhanh</span>
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-blue-700">MaSanPham</span>
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700">SoLuongBan</span>
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700">DonGia</span>
              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-emerald-700">ThanhTien</span>
            </div>
          </div>

          {/* Tiến trình xác thực dữ liệu */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Trạng thái kiểm tra toàn vẹn (ETL Validation):</span>
              </span>
              <span className="font-black text-emerald-700">
                {uploadProgress}% • SẴN SÀNG
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>

            <p className="text-[11px] text-slate-500 text-right">
              Đã kiểm tra hợp lệ <strong>12,450 dòng giao dịch</strong> từ 32 điểm bán WinMart Đà Nẵng, không phát hiện lỗi rỗng/sai định dạng.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            Đóng Cửa Sổ
          </button>
          
          <button
            onClick={() => {
              alert('Đã nạp thành công 12,450 dòng giao dịch vào kho OLAP! Mô hình AI Prophet đã cập nhật dữ liệu mới nhất.');
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center space-x-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Lưu & Cập Nhật Mô Hình AI</span>
          </button>
        </div>

      </div>
    </div>
  );
}
