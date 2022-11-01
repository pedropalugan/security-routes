import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react'
import Header from '../componentes/Header/Header';
import Footer from '../componentes/Footer/Footer';
import "./../styles.css";
import Home from './login/Redefinir';
import { useParams } from 'react-router-dom'
import { useTheme } from './login'




function App() {

  const {cargo} = useParams()

  return (
      <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;


