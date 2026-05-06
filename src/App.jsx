import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header"; 
import Sidebar from "./components/layout/Sidebar"; 

// التعديل هنا: شيلنا /pages/ لأن المجلد موجود في src مباشرة
import ReceiptDetails from "./pages/ReceiptDetails"; 

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <Header />
        <div style={{ display: "flex", flex: 1, overflow: "hidden", direction: "rtl" }}>
          <Sidebar />
          <main style={{ flex: 1, overflowY: "auto", textAlign: "right" }}>
            <Switch>
              <Route exact path="/">
                {/* المكون ده هو اللي جواه كل الشغل دلوقتي */}
                <ReceiptDetails />
              </Route>
              <Route path="/all-receipts">
                <div style={{ padding: "50px", textAlign: "center" }}>
                  <h2>قائمة الإيصالات</h2>
                </div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;