import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Category from './Routes/Category';
import SignIn from './Routes/Signin';
import SignOut from './Routes/Signout';
import Register from './Routes/Register';
import Movie from './Routes/Movie';
import Dashboard from './Routes/Dashboard';
import AllMovies from './Routes/AllMovies';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';
import './Components/Styles/Styles.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
  <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/dashboard/" element={<Dashboard />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/search/allmovies" element={<AllMovies />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
