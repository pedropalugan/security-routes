import React, { useState } from "react";
import { Container, Card, Button, Modal, Form, Input } from "react-bootstrap";
import Axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [telaSim, setTelaSim] = useState('nao');
  const [token, setToken] = useState('')
  const [senha, setSenha] = useState('')
  const [cargo, setCargo] = useState('')
  const [senhaConfirmada, setSenhaConfirmada] = useState('')

  const validar = () => {
    if (email != null | email != undefined) {
      Axios.put('http://localhost:3000/recuperarSenha/mandarEmail', {
        email: email
      }).then((response) => response.data)
        .then((response) => {
          if (response.error === true) {
            alert(response.msg)
          }
          else {
            setCargo(response.tabela)
            console.log(response)
          }
        })
      return (setShow(true))

    } else {
      return (window.alert('CPF inválido! Verifique suas credenciais!'));
    }
  };

  const redefinir = () => {
    if (senha === senhaConfirmada) {
      Axios.put('http://localhost:3000/recuperarSenha/verificarCodigo', {
        codigo: token,
        senha: senha,
        email: email,
        cargo: cargo
      }).then((response) => response.data)
        .then((response) => console.log(response))
    }
    else{
      alert("As senhas informadas não são as mesmas")
    }
  }

  return (
    <Container className="mt-5">
      <Card className="p-5">
        <Card.Body>
          <Form className="d-flex justify-content-center">
            <div className="form">
              <Form.Group className="mb-3 " controlId="formBasicEmail" >
                <Form.Label>Email:</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Button
                variant="success"
                type="button"
                className="btn"
                onClick={validar}
              >
                Redefinir
              </Button>



            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title >Redefinir Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={{}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

              <Form.Label>Token:</Form.Label>
              <Form.Control required placeholder="" value={token} onChange={(e) => setToken(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Senha:</Form.Label>
              <Form.Control type="password" required placeholder="" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirmar senha:</Form.Label>
              <Form.Control type="password" required placeholder="" value={senhaConfirmada}
                onChange={(e) => setSenhaConfirmada(e.target.value)} />
            </Form.Group>


            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Fechar
              </Button>
              <Button variant="success" onClick={redefinir}>
                Enviar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
