import React, { useState, createContext, useContext } from 'react'
import { Link } from 'react-router-dom';
import login from '../../assets/atleta.png';
import Sesi from '../../assets/logo2.jpg';
import './style.css';

import Axios from "axios";
import { Button } from 'react-bootstrap';

const ThemeContext = createContext()


export const useTheme = () => useContext()


function Login(){
  const [emailAccount, setEmail] = useState("")
  const [pswd, setPassword] = useState("")

  const [auth, setAuth] = useState(false)



  

  function handleLogin(){
    Axios.post('http://localhost:3000/login', {
      email : emailAccount,
      senha : pswd
    }).then((response) => {
      setAuth(response.data.auth)
      if(response.data.msg === "SUCESSO") window.location.href = `/home/${response.data.cargo}`
      else alert('Senha ou email incorretos')
    })
  };

  
  return (
      <ThemeContext.Provider value={[auth, setAuth]}>
        <div className="container-login">
          <div className="img-box">
            <img src={login} alt="teste"/>
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
                          <span>Digite o CPF:</span>
                          <input type="text" className='reste' placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                          <div className="mb-3">
                      </div>
                      </div>

                      <div className="input-box">
                          <span>Digite a senha:</span>
                          <input className='border-2' type="password" placeholder="Informe sua senha" onChange={e => setPassword(e.target.value)}/>
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
      </ThemeContext.Provider>
  )
}

export default Login;
