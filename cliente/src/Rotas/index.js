import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Paginas/login";
import Redefinir from "../Paginas/login/Redefinir";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/Footer/Footer";
import PageNotFound from "../Paginas/404";
import Atleta from "../Paginas/atleta";
import Medico from "../Paginas/medico";
import Gestor from "../Paginas/gestor";
import MedicoParceiro from "../Paginas/medico_parceiro";

const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/redefinir" element={<Redefinir />} />
      <Route path="*" element={<PageNotFound />} />
      <Route exact path="/atleta" element={<Atleta />} />
      <Route exact path="/medico" element={<Medico />} />
      <Route exact path="/gestor" element={<Gestor />} />
      <Route exact path="/médico parceiro" element={<MedicoParceiro />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default Rotas;
