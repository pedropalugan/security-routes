import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Paginas/login';
import Redefinir from '../Paginas/login/Redefinir';
import Home from '../Paginas/';
import Header from '../componentes/Header/Header';
import Footer from '../componentes/Footer/Footer';
import PageNotFound from '../Paginas/404';



const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/'    element={ <Login /> } />
      <Route exact path='/home/:cargo' element={ <Home /> } />
      <Route exact path='/redefinir' element={ <Home /> } />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Rotas;