import Sidebarnav from "./Components/Admin/AdminSideBar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import CountryForm from "./Components/Admin/CountryForm"
import Adminview from "./Components/Admin/Adminview";
import Aizen from "./Components/Aizen";

function App() {
  return (
    <Router>
      <Routes>
              <Route path="/aizen-admin" element={<Adminview />} />
              <Route path="/aizen" element={<Aizen />} />
              {/* Add other routes as needed */}
            </Routes>
    </Router>
  );
}

export default App

