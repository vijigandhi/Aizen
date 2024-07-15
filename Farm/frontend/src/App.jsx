import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css'; 
import RouterComponent from './Components/router'

function App() {
    return (
        <div className="App">
            {/* <RegistrationForm /> */}
            {/* <StateForm />
            <CategoryForm /> */}
            <RouterComponent />
        </div>
    );
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import ProductList from './Components/ProductList';

// function App() {
//   return (
//     <>
//       <Header />
//       <main>
//         <ProductList />
//       </main>
//       <Footer />
//     </>
//   );
}

export default App;
// import Sidebarnav from "./Components/Admin/AdminSideBar"
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Footer from "./Components/Footer"
// import Header from "./Components/Header"
// import CountryForm from "./Components/Admin/CountryForm"
// import Adminview from "./Components/Admin/Adminview";
// import Aizen from "./Components/Aizen";

// function App() {
//   return (
//     <Router>
//       <Routes>
//               <Route path="/aizen-admin" element={<Adminview />} />
//               <Route path="/aizen" element={<Aizen />} />
//               {/* Add other routes as needed */}
//             </Routes>
//     </Router>
//   );
// }


