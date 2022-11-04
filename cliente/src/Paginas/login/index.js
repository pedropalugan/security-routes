import React, { useState, createContext } from 'react'
import { Link } from 'react-router-dom';
import login from '../../assets/atleta.png';
import Sesi from '../../assets/logo2.jpg';
import './style.css';

import Axios from "axios";
import { Button } from 'react-bootstrap';

export const UserContext = createContext();

function Login({ children }) {
  const [emailAccount, setEmail] = useState("")
  const [pswd, setPassword] = useState("")

  const [auth, setAuth] = useState('false')

  function handleLogin() {
    Axios.post('http://localhost:3000/login', {
      email: emailAccount,
      senha: pswd
    }).then((response) => {
      setAuth(response.data.auth)
      alert(response.data.auth)
      if (response.data.msg === "SUCESSO") window.location.href = `${response.data.cargo.toLowerCase()}`
      else alert('Senha ou email incorretos')
    })
  };


  return (
    <div>
      <UserContext.Provider value={{auth, setAuth}}>
        {children}
      </UserContext.Provider>
      <div className="container-login">
        <div className="img-box">
          <img src={login} alt="teste" />
        </div>
        <div className="content-box">
          <div className="form-box">
            <div className='segundo'>
              <h3>BEM-VINDO AO</h3>
            </div>
            <div className="titulo-segundario">
              <h2>PORTAL ESPORTE</h2>
            </div>
            <img src={Sesi} className="logo" />

            <form>
              <div className="input-box">
                <span>Digite o email:</span>
                <input type="text" className='reste' placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <div className="mb-3">
                </div>
              </div>

              <div className="input-box">
                <span>Digite a senha:</span>
                <input className='border-2' type="password" placeholder="Informe sua senha" onChange={e => setPassword(e.target.value)} />
              </div>



              <div className="input-box">
                <Button onClick={handleLogin} className="btnEntrar">Entrar</Button>
              </div>
              <div className="remember">
                <Link to="/Redefinir">
                  Esqueceu a Senha?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;