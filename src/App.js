import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Gallery from './containers/Gallery/Gallery';
import Services from './containers/Services/Services';
import Contact from './containers/Contact/Contact'
import paths from './config/paths';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={paths.HOME} element={<Home/>}></Route>
          <Route path={paths.GALLERY} element={<Gallery/>}>
            {/* <Route path="?sort=" element={<Gallery></Gallery>}></Route> */}
          </Route>
          <Route path={paths.SERVICES} element={<Services/>}></Route>
          <Route path={paths.CONTACT} element={<Contact/>}></Route>
          <Route path="*" element={<h1 style={{color: "black"}}>404</h1>}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
