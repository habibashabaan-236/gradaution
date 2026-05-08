import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/layout/Header"; 
import Sidebar from "./components/layout/Sidebar"; 
import ReceiptDetails from "./pages/ReceiptDetails"; 
import ViewReceipt from "./pages/ViewReceipt";
import { Toaster } from "react-hot-toast";

// مكون فرعي للتحكم في عرض الصفحة
function AppContent() {
  const location = useLocation();

  // هنا بنحدد إن السايد بار يختفي لو إحنا في المسار الرئيسي "/"
  // تقدري تضيفي أي مسارات تانية مش عايزة فيها سايد بار
  const showSidebar = location.pathname !== "/";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Header />
      <div style={{ display: "flex", flex: 1, overflow: "hidden", direction: "rtl" }}>
        
        {/* السايد بار هيظهر فقط لو الشرط تحقق */}
        {showSidebar && <Sidebar />}

        <main style={{ 
          flex: 1, 
          overflowY: "auto", 
          textAlign: "right", 
          padding: showSidebar ? "0" : "20px" // بادينج إضافي لما يختفي السايد بار
        }}>
          <Switch>
            <Route exact path="/">
              <ViewReceipt /> 
            </Route>

            <Route path="/all-receipts">
              <div style={{ padding: "50px", textAlign: "center" }}>
                <h2>قائمة الإيصالات</h2>
              </div>
            </Route>

            <Route path="/old-details">
              <ReceiptDetails />
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