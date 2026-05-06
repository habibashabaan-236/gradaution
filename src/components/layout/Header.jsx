import { Bell, User, LayoutDashboard, Receipt, Settings } from "lucide-react";

function Header() {
  return (
    <>
      {/* Navigation styles */}
      <style>
        {`
          .nav-item-custom {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.25s ease;
            padding-bottom: 4px;
          }

          .nav-item-custom:hover {
            color: var(--primary-color);
          }

          .nav-active {
            color: var(--primary-color);
            font-weight: bold;
            border-bottom: 2px solid var(--primary-color);
          }
        `}
      </style>

      <div
        className="border-bottom px-4 py-3 d-flex align-items-center justify-content-between"
        style={{ background: "#fff" }}
      >
        {/* App title */}
        <div
          className="fw-bold"
          style={{
            color: "var(--primary-color)",
            fontSize: "18px",
          }}
        >
          عباد الرحمن
        </div>

        {/* Navigation menu */}
        <div className="d-flex align-items-center gap-4">

          <div className="nav-item-custom">
            <LayoutDashboard size={18} />
            <span>لوحة التحكم</span>
          </div>

          <div className="nav-item-custom nav-active">
            <Receipt size={18} />
            <span>الإيصالات</span>
          </div>

          <div className="nav-item-custom">
            <Settings size={18} />
            <span>الإعدادات</span>
          </div>

        </div>

        {/* User actions */}
        <div className="d-flex align-items-center gap-3">
          <Bell size={20} />
          <User size={20} />
        </div>
      </div>
    </>
  );
}

export default Header;