import { useState } from "react";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import Orders from "./pages/Orders";
import Stats from "./pages/Stats";
import Finances from "./pages/Finances";
import Marketing from "./pages/Marketing";
import Integrations from "./pages/Integrations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Routes>
      {/* <Layout>
        <h1 className="text-3xl mb-4">Welcome to My Website</h1>
        <p>This is the main content section of your website.</p>
      </Layout> */}
      <Route path="/" element={<Layout><Dashboard/></Layout>}/>
      <Route path="/listings" element={<Layout><Listings/></Layout>}/>
      <Route path="/orders" element={<Layout><Orders/></Layout>}/>
      <Route path="/stats" element={<Layout><Stats/></Layout>}/>
      <Route path="/finances" element={<Layout><Finances/></Layout>}/>
      <Route path="/marketing" element={<Layout><Marketing/></Layout>}/>
      <Route path="/integrations" element={<Layout><Integrations/></Layout>}/>
      <Route path="/reports" element={<Layout><Reports/></Layout>}/>
      <Route path="/settings" element={<Layout><Settings/></Layout>}/>
      <Route path="/inbox" element={<Layout><Inbox/></Layout>}/>
      <Route path="/notifications" element={<Layout><Notifications/></Layout>}/>
    </Routes>
  );
}

export default App;
