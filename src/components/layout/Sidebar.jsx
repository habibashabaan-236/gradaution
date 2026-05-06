import { LayoutDashboard, Receipt, Settings, Plus, LogOut } from "lucide-react";

function Sidebar({ setShowForm }) {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        width: "250px",
        height: "100%",
        background: "#fff",
        padding: "16px",
      }}
    >
      {/* Top section */}
      <div>

        {/* Brand info */}
        <div className="text-end mb-4">
          <h5
            className="fw-bold mb-0"
            style={{ color: "var(--primary-color)" }}
          >
            عباد الرحمن
          </h5>

          <small style={{ color: "var(--primary-color)" }}>
            لخدمات المحمول
          </small>
        </div>

        {/* Navigation links */}
        <ul className="nav flex-column text-end">

          <li className="mb-2">
            <a className="nav-link text-dark d-flex justify-content-end gap-2" href="#">
              لوحة التحكم
              <LayoutDashboard size={18} />
            </a>
          </li>

          <li className="mb-2">
            <a className="nav-link fw-bold d-flex justify-content-end gap-2" href="#">
              الإيصالات
              <Receipt size={18} />
            </a>
          </li>

        </ul>

        {/* Create receipt button */}
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="btn w-100 mt-4 text-white d-flex align-items-center justify-content-center gap-2"
          style={{
            background: "var(--primary-color)",
            borderRadius: "10px",
          }}
        >
          <Plus size={18} />
          إيصال جديد
        </button>

      </div>

      {/* Footer actions */}
      <div className="text-end mt-4">

        <div
          className="d-flex justify-content-end align-items-center gap-2 mb-3 text-muted"
          style={{ cursor: "pointer" }}
        >
          <span>الإعدادات</span>
          <Settings size={18} />
        </div>

        <div
          className="d-flex justify-content-end align-items-center gap-2"
          style={{ cursor: "pointer", color: "#ef4444" }}
        >
          <span>خروج</span>
          <LogOut size={18} />
        </div>

      </div>

    </div>
  );
}

export default Sidebar;