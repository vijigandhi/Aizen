import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import AdminSideBar from './AdminSideBar';
import CountryForm from './CountryForm';
import StateForm from './StateForm';
import CityForm from './CityForm';
import StoreForm from './StoreForm';
import CategoryForm from './CategoryForm';
import SubCategoryForm from './SubCategoryForm';

const Adminview = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="flex">
          <AdminSideBar />
          <div className="maincontent flex-1 p-4">
          
            <Routes>
              <Route path='/add-category' element={<CategoryForm/>}/>
              <Route path='/add-sub-category' element={<SubCategoryForm/>}/>
              <Route path="/add-store" element={<StoreForm />} />
              <Route path="/add-country" element={<CountryForm />} />
              <Route path="/add-state" element={<StateForm />} />
              <Route path="/add-city" element={<CityForm />} />
              {/* Add other routes as needed */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Adminview;
