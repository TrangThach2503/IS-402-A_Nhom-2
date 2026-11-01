import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ForecastPage from './pages/ForecastPage';
import WhatIfPage from './pages/WhatIfPage';
import QuotaPage from './pages/QuotaPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Khi đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentTab('dashboard');
  };

  // Đăng xuất để quay lại màn hình đăng nhập
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('dashboard');
  };

  // Điều hướng giữa các phân hệ DSS
  const handleNavigate = (tab) => {
    setCurrentTab(tab);
  };

  // 1. Màn hình Đăng nhập
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Màn hình Xưởng Dự Báo Chuỗi Thời Gian AI (AI Prophet Forecasting Hub)
  if (currentTab === 'forecast') {
    return (
      <ForecastPage 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate} 
      />
    );
  }

  // 3. Màn hình Hộp Cát Mô Phỏng What-If & Lựa Chọn Kịch Bản
  if (currentTab === 'whatif') {
    return (
      <WhatIfPage 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate} 
      />
    );
  }

  // 4. Màn hình Ma Trận Phân Bổ Quota & Phê Duyệt Kế Hoạch
  if (currentTab === 'quota') {
    return (
      <QuotaPage 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate} 
      />
    );
  }

  // 5. Màn hình Bảng Điều Khiển Giám Sát Sai Lệch (Intelligence Dashboard - Mặc định)
  return (
    <DashboardPage 
      currentUser={currentUser} 
      onLogout={handleLogout} 
      onNavigate={handleNavigate} 
    />
  );
}

