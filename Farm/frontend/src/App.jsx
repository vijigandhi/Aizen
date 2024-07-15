import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductList from './Components/ProductList';

function App() {
  return (
    <>
      <Header />
      <main>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
