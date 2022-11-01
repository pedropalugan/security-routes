import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import "./styles.css";
// import AvalicacoesRecebidas from './Paginas/medico/AvalicacoesRecebidas'
import Login from './Paginas/login'
import PaginaMedico from './Paginas/medico';
import PaginaAtleta from './Paginas/atleta';
import PaginaGestor from './Paginas/gestor';
import Rotas from '../src/Rotas'



function App() {
  return (
      <div className="App">
     
        <Rotas />
        
      </div>

  );
}

export default App;


