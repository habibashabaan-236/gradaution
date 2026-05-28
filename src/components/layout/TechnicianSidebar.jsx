import React from "react";
import { 
  LayoutDashboard, 
  ReceiptText, 
  History, 
  UserCircle, 
  Store, 
  Settings, 
  LogOut 
} from "lucide-react";

const TechnicianSidebar = () => {
  const colors = {
    activeBlue: "#e0ebff",
    activeText: "#1e40af",
    normalText: "#4b5563",
    logoutRed: "#dc2626",
    subText: "#6b7280" 
  };

  const menuItems = [
    { id: "dash", text: "لوحة التحكم", icon: <LayoutDashboard size={22} />, active: false },
    { id: "receipts", text: "إيصالاتي", icon: <ReceiptText size={22} />, active: false },
    { id: "history", text: "سجل الصيانة", icon: <History size={22} />, active: false },
    { id: "profile", text: "الملف الشخصي", icon: <UserCircle size={22} />, active: false },
    { id: "inventory", text: "المخزن", icon: <Store size={22} />, active: true },
  ];

  return (
    <div 
      style={{ 
        width: "260px", 
        height: "100%", 
        background: "#fff", 
        borderLeft: "1px solid #e5e7eb", 
        display: "flex", 
        flexDirection: "column",
        padding: "20px 0px",
        justifyContent: "space-between"
      }}
    >
      <div>
     
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          marginBottom: "30px",
          padding: "0 20px" 
        }}>
     
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(30, 64, 175, 0.15)",
            border: "2px solid #e0ebff",
            marginBottom: "12px"
          }}>
            <img 
              src="/image/OIP.jpg" 
              alt="Technician"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          
          <h3 style={{ 
            fontSize: "20px", 
            fontWeight: "bold", 
            color: colors.activeText, 
            margin: "0",
            textAlign: "center" 
          }}>
            فني صيانة
          </h3>
          <p style={{ 
            fontSize: "15px", 
            color: colors.normalText, 
            margin: "4px 0 0 0",
            textAlign: "center"
          }}>
            عباد الرحمن
          </p>
        </div>
        {/* ------------------------------------------------ */}

        {/* قائمة الروابط */}
        <div className="d-flex flex-column gap-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "12px",
                padding: "12px 24px",
                cursor: "pointer",
                transition: "0.2s",
                backgroundColor: item.active ? colors.activeBlue : "transparent",
                color: item.active ? colors.activeText : colors.normalText,
                fontWeight: item.active ? "bold" : "500",
                borderRight: item.active ? `4px solid ${colors.activeText}` : "4px solid transparent",
              }}
            >
              <span style={{ order: 2 }}>{item.text}</span>
              <span style={{ order: 1 }}>{item.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* الجزء السفلي */}
      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px", color: colors.normalText, cursor: "pointer" }}>
          <span style={{ order: 2 }}>إعدادات</span>
          <Settings size={22} style={{ order: 1 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px", color: colors.logoutRed, cursor: "pointer" }}>
          <span style={{ order: 2 }}>خروج</span>
          <LogOut size={22} style={{ order: 1 }} />
        </div>
      </div>
    </div>
  );
};

export default TechnicianSidebar;