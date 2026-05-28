import { Bell, ChevronDown } from "lucide-react";

const TechnicianHeader = () => {
  return (
    <nav className="border-bottom px-4 py-2 d-flex align-items-center justify-content-between" 
         style={{ background: "#fff", minHeight: "60px" }} dir="rtl">
      
      {/* اللوجو الجديد FixFlow */}
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        <span style={{ color: "#003a8c" }}>Fix</span>
        <span style={{ color: "#f39c12" }}>Flow</span>
      </div>

      {/* روابط التنقل */}
      <div className="d-flex align-items-center gap-4">
        <div style={{ color: "#2854e6", borderBottom: "2px solid #2854e6", paddingBottom: "4px", cursor: "pointer" }}>المخزن</div>
        <div style={{ color: "#4b5563", cursor: "pointer" }}>المشتريات</div>
        <div className="d-flex align-items-center gap-1" style={{ color: "#4b5563", cursor: "pointer" }}>
          المبيعات <ChevronDown size={14} />
        </div>
          <div className="d-flex align-items-center gap-1" style={{ color: "#4b5563", cursor: "pointer" }}>
          المرتجعات <ChevronDown size={14} />
        </div>
            <div style={{ color: "#4b5563", cursor: "pointer" }}>التوالف</div>
      </div>

      {/* التنبيهات والصورة */}
      <div className="d-flex align-items-center gap-3">
        <Bell size={20} color="#666" />
        <div style={{ width: "35px", height: "35px", background: "#ddd", borderRadius: "4px" }}></div>
      </div>
    </nav>
  );
};

export default TechnicianHeader;