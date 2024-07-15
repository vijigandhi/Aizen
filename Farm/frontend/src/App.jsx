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
