import React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation, Redirect } from "react-router-dom"; // ضيفنا Redirect هنا
import { Toaster } from "react-hot-toast";

// استيراد المكونات
import Header from "./components/layout/Header"; 
import TechnicianHeader from "./components/layout/TechnicianHeader"; 
import Sidebar from "./components/layout/Sidebar"; 
import TechnicianSidebar from "./components/layout/TechnicianSidebar"; 

// استيراد الصفحات
import ViewReceipt from "./pages/ViewReceipt";
import ReceiptDetails from "./pages/ReceiptDetails";
import Inventory from "./pages/Inventory";


function AppContent() {
  const location = useLocation();

  // 1. تحديد إذا كنا في سيكشن التكنيشن
  const isTechnicianSection = location.pathname.startsWith("/technician");

  // 2. تحديد ظهور السايد بار القديم
  const showOldSidebar = location.pathname !== "/" && !isTechnicianSection;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      
      {/* التبديل الذكي بين الهيدرز */}
      {isTechnicianSection ? <TechnicianHeader /> : <Header />}

      <div style={{ display: "flex", flex: 1, overflow: "hidden", direction: "rtl" }}>
        
        {/* التبديل بين السايد بار */}
        {isTechnicianSection ? (
          <TechnicianSidebar /> 
        ) : (
          showOldSidebar && <Sidebar />
        )}

        <main style={{ 
          flex: 1, 
          overflowY: "auto", 
          textAlign: "right", 
          padding: isTechnicianSection ? "0" : (showOldSidebar ? "0" : "20px"),
          background: isTechnicianSection ? "#f8f9fa" : "#fff" 
        }}>
          <Switch>
            {/* التعديل هنا: أول ما يفتح الصفحة (/) يحوله فوراً للمخزن */}
            <Route exact path="/">
              <Redirect to="/technician/inventory" />
            </Route>

            {/* مسار المخزن */}
            <Route path="/technician/inventory">
              <Inventory /> 
            </Route>

            {/* باقي المسارات */}
            <Route path="/all-receipts">
              <div style={{ padding: "50px", textAlign: "center" }}>
                <h2>قائمة الإيصالات</h2>
              </div>
            </Route>

            <Route path="/old-details">
              <ReceiptDetails />
            </Route>
            
            {/* مسار الاستقبال القديم لو احتاجتيه */}
            <Route path="/view-receipt">
              <ViewReceipt />
            </Route>

          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;