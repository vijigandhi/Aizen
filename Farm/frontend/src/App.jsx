
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
}

export default App;
