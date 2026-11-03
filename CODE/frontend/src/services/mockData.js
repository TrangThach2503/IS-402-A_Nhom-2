// Dữ liệu mẫu thực tế 100%: Chuỗi Bán Lẻ WinMart & WinMart+ Đà Nẵng (WinCommerce - Masan)
// Nguồn tham chiếu: Hệ thống winmart.vn & Chiến dịch Cẩm nang mua sắm WinMart Đà Nẵng

export const winmartNetworkInfo = {
  brand: 'WinMart & WinMart+ Đà Nẵng',
  operator: 'Công ty Cổ phần Dịch vụ Thương mại Tổng hợp WinCommerce (Tập đoàn Masan)',
  totalStores: 32,
  supermarkets: 1, // 01 Đại siêu thị WinMart Vincom Plaza Ngô Quyền
  convenienceStores: 31, // 31 Cửa hàng tiện ích WinMart+ và WiN
  campaign: 'Cẩm Nang Mua Sắm WinMart Đà Nẵng (Định kỳ & Khuyến mãi Hè)',
  centralWarehouse: 'Tổng kho Logistics Miền Trung - KCN Hòa Cầm, Q. Cẩm Lệ, TP. Đà Nẵng'
};

export const monthlySalesData = [
  { month: 'T11/25', keHoach: 2.10, thucTe: 2.05, delta: -0.05 },
  { month: 'T12/25', keHoach: 2.45, thucTe: 2.60, delta: +0.15 },
  { month: 'T01/26', keHoach: 2.80, thucTe: 2.95, delta: +0.15 }, // Mua sắm Tết Nguyên Đán
  { month: 'T02/26', keHoach: 2.20, thucTe: 2.15, delta: -0.05 },
  { month: 'T03/26', keHoach: 2.00, thucTe: 2.10, delta: +0.10 },
  { month: 'T04/26', keHoach: 2.30, thucTe: 2.42, delta: +0.12 }, // Khởi động mùa du lịch biển Đà Nẵng
  { month: 'T05/26', keHoach: 2.15, thucTe: 2.28, delta: +0.13 },
  { month: 'T06/26', keHoach: 2.25, thucTe: 2.35, delta: +0.10 }, // Lễ hội Pháo hoa Quốc tế DIFF
  { month: 'T07/26', keHoach: 2.35, thucTe: 2.50, delta: +0.15 }, // Cao điểm Cẩm nang mua sắm & Khách du lịch hè
  { month: 'T08/26', keHoach: 2.10, thucTe: 2.20, delta: +0.10 },
  { month: 'T09/26', keHoach: 2.30, thucTe: 2.40, delta: +0.10 }, // Mùa tựu trường sinh viên ĐH Bách Khoa, Sư Phạm
  { month: 'T10/26', keHoach: 2.60, thucTe: 2.45, delta: -0.15 }, // Mùa mưa bão miền Trung ảnh hưởng sức mua
];

export const waterfallItems = [
  { name: 'Kế Hoạch Giao', value: 26.60, base: 0, diff: 26.60, type: 'baseline', color: '#64748B' },
  { name: 'Sản Lượng Bán (+)', value: 1.40, base: 26.60, diff: 1.40, type: 'positive', color: '#10B981' },
  { name: 'Trợ Giá WiN (-)', value: -0.30, base: 27.70, diff: -0.30, type: 'negative', color: '#EF4444' },
  { name: 'Marketing Cẩm Nang (+)', value: 1.00, base: 27.70, diff: 1.00, type: 'positive', color: '#10B981' },
  { name: 'Hụt Hàng Tổng Kho (-)', value: -0.25, base: 28.45, diff: -0.25, type: 'negative', color: '#EF4444' },
  { name: 'Doanh Số Thực Tế', value: 28.45, base: 0, diff: 28.45, type: 'total', color: '#2563EB' },
];

// 12 Điểm bán đại diện trích xuất từ 32 điểm bán thực tế 100% của WinMart tại Đà Nẵng
export const danangStoreList = [
  { id: 'WM-ST01', name: 'Đại Siêu Thị WinMart Vincom Đà Nẵng', district: 'Sơn Trà', address: 'Tầng 2, TTTM Vincom Plaza, 910A Ngô Quyền, P. An Hải Bắc' },
  { id: 'WM-HC02', name: 'WinMart+ 41 Hải Hồ', district: 'Hải Châu', address: '41 Hải Hồ, P. Thanh Bình, Q. Hải Châu' },
  { id: 'WM-HC03', name: 'WiN 53 Phan Đăng Lưu', district: 'Hải Châu', address: '53 Phan Đăng Lưu, P. Hoà Cường Nam, Q. Hải Châu' },
  { id: 'WM-HC04', name: 'WinMart+ 213 Hoàng Diệu', district: 'Hải Châu', address: '213 Hoàng Diệu, P. Nam Dương, Q. Hải Châu' },
  { id: 'WM-HC05', name: 'WinMart+ 114 Quang Trung', district: 'Hải Châu', address: '114 Quang Trung, P. Thạch Thang, Q. Hải Châu' },
  { id: 'WM-TK06', name: 'WinMart+ 152 Trần Cao Vân', district: 'Thanh Khê', address: '152 Trần Cao Vân, P. Tam Thuận, Q. Thanh Khê' },
  { id: 'WM-TK07', name: 'WinMart+ 88 Hà Huy Tập', district: 'Thanh Khê', address: '88 Hà Huy Tập, P. Thanh Khê Đông, Q. Thanh Khê' },
  { id: 'WM-ST08', name: 'WiN 86 Nguyễn Thị Định', district: 'Sơn Trà', address: '25-E1 Nguyễn Thị Định, P. An Hải Bắc, Q. Sơn Trà' },
  { id: 'WM-ST09', name: 'WinMart+ 111-113 Trần Hưng Đạo', district: 'Sơn Trà', address: '111-113 Trần Hưng Đạo, P. Nại Hiên Đông, Q. Sơn Trà' },
  { id: 'WM-CL10', name: 'WinMart+ 182 Ông Ích Đường', district: 'Cẩm Lệ', address: '182 Ông Ích Đường, P. Khuê Trung, Q. Cẩm Lệ' },
  { id: 'WM-CL11', name: 'WinMart+ 241 Phan Đăng Lưu', district: 'Cẩm Lệ', address: '241 Phan Đăng Lưu, P. Khuê Trung, Q. Cẩm Lệ' },
  { id: 'WM-LC12', name: 'WinMart+ 103 Nguyễn Huy Tưởng', district: 'Liên Chiểu', address: '103 Nguyễn Huy Tưởng, P. Hoà Minh, Q. Liên Chiểu' },
];

export const redFlagStores = [
  {
    id: 'WM-CL10',
    name: 'WinMart+ 182 Ông Ích Đường',
    district: 'Cẩm Lệ',
    address: '182 Ông Ích Đường, P. Khuê Trung, Q. Cẩm Lệ, TP. Đà Nẵng',
    manager: 'Trần Văn An',
    actual: '1.62 Tỷ',
    target: '1.90 Tỷ',
    variance: '-280 Triệu',
    variancePct: '-14.7%',
    reason: 'Đoạn đường Ông Ích Đường ngập cục bộ sau đợt bão; gián đoạn điều phối thịt sạch MEATDeli & rau WinEco từ Tổng kho Hòa Cầm trong 3 ngày',
    actionText: 'Kích hoạt Mô Phỏng What-If để cứu doanh số →',
    severity: 'critical'
  },
  {
    id: 'WM-TK06',
    name: 'WinMart+ 152 Trần Cao Vân',
    district: 'Thanh Khê',
    address: '152 Trần Cao Vân, P. Tam Thuận, Q. Thanh Khê, TP. Đà Nẵng',
    manager: 'Lê Thị Mai',
    actual: '1.75 Tỷ',
    target: '2.00 Tỷ',
    variance: '-250 Triệu',
    variancePct: '-12.5%',
    reason: 'Cửa hàng tiện lợi đối thủ mở mới đối diện giảm giá sốc; tỷ lệ đứt hàng (out-of-stock) các mặt hàng cẩm nang khuyến mãi Masan (Omachi, Chinsu) giờ tan tầm',
    actionText: 'Kích hoạt Mô Phỏng What-If để cứu doanh số →',
    severity: 'critical'
  }
];

// Dữ liệu huấn luyện & chuỗi thời gian dự báo AI Prophet (Facebook Prophet Time Series)
export const prophetTimeSeriesData = [
  { date: 'T05/26', actual: 2.28, yhat: null, yhatLower: null, yhatUpper: null, target: 2.15 },
  { date: 'T06/26', actual: 2.35, yhat: null, yhatLower: null, yhatUpper: null, target: 2.25 },
  { date: 'T07/26', actual: 2.50, yhat: null, yhatLower: null, yhatUpper: null, target: 2.35 },
  { date: 'T08/26', actual: 2.20, yhat: null, yhatLower: null, yhatUpper: null, target: 2.10 },
  { date: 'T09/26', actual: 2.40, yhat: null, yhatLower: null, yhatUpper: null, target: 2.30 },
  { date: 'T10/26', actual: 2.45, yhat: 2.45, yhatLower: 2.38, yhatUpper: 2.52, target: 2.60 }, // Điểm chuyển giao hiện tại
  { date: 'T11/26', actual: null, yhat: 3.10, yhatLower: 2.85, yhatUpper: 3.35, target: 2.90 }, // Dự báo 30 ngày
  { date: 'T12/26', actual: null, yhat: 3.75, yhatLower: 3.40, yhatUpper: 4.10, target: 3.50 }, // Dự báo 60 ngày
  { date: 'T01/27', actual: null, yhat: 4.30, yhatLower: 3.90, yhatUpper: 4.70, target: 4.00 }, // Dự báo 90 ngày (Tết Nguyên Đán 2027)
];

// Bảng trích xuất dự báo 3 tháng tới của WinMart Đà Nẵng
export const forecastSummaryTable = [
  {
    month: 'Tháng 11 / 2026',
    horizon: '+30 Ngày',
    pessimistic: 2.85,
    expected: 3.10,
    optimistic: 3.35,
    growth: '+8.5%',
    benchmarkTarget: 2.90,
    note: 'Khai mạc chương trình Cẩm nang mua sắm mùa đông & Tri ân Hội viên WiN'
  },
  {
    month: 'Tháng 12 / 2026',
    horizon: '+60 Ngày',
    pessimistic: 3.40,
    expected: 3.75,
    optimistic: 4.10,
    growth: '+14.2%',
    benchmarkTarget: 3.50,
    note: 'Lễ hội Giáng sinh & Tết Dương lịch, sức mua đồ uống & thực phẩm tiện lợi tăng mạnh'
  },
  {
    month: 'Tháng 01 / 2027',
    horizon: '+90 Ngày',
    pessimistic: 3.90,
    expected: 4.30,
    optimistic: 4.70,
    growth: '+18.0%',
    benchmarkTarget: 4.00,
    note: 'Cao điểm phục vụ giỏ quà Tết Masan & tiêu dùng thực phẩm Tết Nguyên Đán toàn chuỗi'
  }
];

// Dữ liệu mẫu kịch bản What-If để so sánh và lựa chọn phương án tối ưu
export const whatIfScenarios = [
  {
    id: 'base',
    name: 'Kịch bản 1: Giữ Nguyên Cơ Sở',
    deltaP: 0,
    deltaM: 0,
    priceFormatted: '25,000 đ',
    mktFormatted: '50.0 Tr đ',
    quantity: 50000,
    revenue: 1250000000,
    profit: 350000000,
    risk: 'An toàn ngắn hạn nhưng lãng phí cơ hội kích cầu mùa Tết',
    recommended: false,
  },
  {
    id: 'discount',
    name: 'Kịch bản 2: Giảm Giá Kích Cầu Sốc',
    deltaP: -5.0,
    deltaM: 25.0,
    priceFormatted: '23,750 đ (-5%)',
    mktFormatted: '62.5 Tr đ (+25%)',
    quantity: 56974,
    revenue: 1353132500,
    profit: 385000000,
    risk: 'Sản lượng tăng mạnh nhưng biên lợi nhuận bị bào mòn',
    recommended: false,
  },
  {
    id: 'optimal',
    name: 'Kịch bản 3: Tối Ưu Song Hành (AI Khuyến Nghị)',
    deltaP: 3.0,
    deltaM: 30.0,
    priceFormatted: '25,750 đ (+3%)',
    mktFormatted: '65.0 Tr đ (+30%)',
    quantity: 53078,
    revenue: 1366758500,
    profit: 410000000,
    risk: 'Doanh thu & lợi nhuận đạt đỉnh cao nhất, bù đắp hoàn toàn chi phí MKT',
    recommended: true,
  },
];

// Danh sách dữ liệu phân bổ chỉ tiêu Quota cho các chi nhánh WinMart Đà Nẵng
export const initialQuotaStores = [
  {
    id: 'WM-ST01',
    name: 'WinMart Vincom Đà Nẵng (Đại Siêu Thị)',
    district: 'Sơn Trà',
    typeBadge: 'Đầu Tàu Doanh Thu',
    typeColor: 'blue',
    histSales: 12000000000,
    histWeight: 0.50, // 50.00%
    growthFactor: 1.10, // Gi
  },
  {
    id: 'WM-HC02',
    name: 'WinMart+ 41 Hải Hồ',
    district: 'Hải Châu',
    typeBadge: 'Ổn Định Nội Thành',
    typeColor: 'emerald',
    histSales: 7200000000,
    histWeight: 0.30, // 30.00%
    growthFactor: 1.00,
  },
  {
    id: 'WM-ST08',
    name: 'WiN 86 Nguyễn Thị Định',
    district: 'Sơn Trà',
    typeBadge: 'Tiềm Năng Du Lịch Biển',
    typeColor: 'purple',
    histSales: 4800000000,
    histWeight: 0.20, // 20.00%
    growthFactor: 1.25,
  },
];

