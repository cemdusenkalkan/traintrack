import React, { useState } from 'react';
import '../admin.css';
import AdminUserManagement from '../components/AdminUserManagement';
// TicketManager ve TrainManager bileşenlerini içe aktar
import TicketManager from '../components/TicketManager';
import TrainManager from '../components/TrainManager';

const AdminPanelPage = () => {
  const [selectedPage, setSelectedPage] = useState('adminUserManagement'); // Başlangıçta AdminUserManagement sayfasını göster

  // Sayfa seçimine göre ilgili bileşeni render etmek için yardımcı bir fonksiyon
  const renderSelectedPage = () => {
    switch (selectedPage) {
      case 'adminUserManagement':
        return <AdminUserManagement />;
      case 'ticketManager':
        return <TicketManager />;
      case 'trainManager':
        return <TrainManager />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {/* Yönetim sayfası seçimini sağlayan bir menü */}
      <div className="admin-navigation">
        <button onClick={() => setSelectedPage('adminUserManagement')}>User Management</button>
        <button onClick={() => setSelectedPage('ticketManager')}>Ticket Manager</button>
        <button onClick={() => setSelectedPage('trainManager')}>Train Manager</button>
      </div>
      {/* Seçilen sayfayı render etmek için renderSelectedPage fonksiyonunu kullan */}
      {renderSelectedPage()}
    </div>
  );
};

export default AdminPanelPage;
