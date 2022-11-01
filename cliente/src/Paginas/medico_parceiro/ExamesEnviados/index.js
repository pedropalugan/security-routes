import React, { useState } from 'react';
import './table.css';
import { Button, Table, Modal, Form, Container } from 'react-bootstrap';
import {saveAs} from 'file-saver';

function Tabela() {

  const [show, setShow] = useState(false);
  const [telaSim, setTelaSim] = useState('nao');

  const [download,setDownload] = useState('https://avatars.githubusercontent.com/u/91327153?v=4')



  function clica(){

   window.alert(download)

  }



  function downloadFile(){

    saveAs(download);

  }

  function validar() {
    setShow(true)
  }

  return (
    <Container>
      <div className='m-5'>
        <Table responsive striped bordered hover >
          <thead>
            <tr class="bg-tabela text-white" >
              <th >Nome do Arquivo</th>
              <th>Validar Exames</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Button variant="success" size="sm" onClick={downloadFile}>Mark.pdf</Button></td>
              <td><Button variant="success" size="sm" onClick={validar}>Validar</Button></td>
            </tr>
            <tr>
              <td><Button variant="success" size="sm" onClick={downloadFile}>Jacob.pdf</Button></td>
              <td><Button variant="success" size="sm" onClick={validar}>Validar</Button></td>
            </tr>
          </tbody>
        </Table>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title >Validar Exame</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={{}}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Registre sua avaliação:</Form.Label>
                {/* <Form.Control
                type="text"
                placeholder=""
                // value={produto}
                // onChange={(e) => {setProduto(e.target.value);}}
                required
                autoFocus
              /> */}
                <div className='divButtons'>
                  <Button variant="success" className="ms-3">Aprovado</Button>
                  <Button variant="danger" className="ms-3">Reprovado</Button>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Justificativa:</Form.Label>
                <Form.Control className='textArea'
                  as="textarea"
                  row={3}
                  placeholder=""
                  // value={preco}
                  // onChange={(e) => {setPreco(e.target.value);}}
                  required
                  autoFocus
                />
              </Form.Group>
              {telaSim === 'sim' ? (
                <>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Especialidade:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      required
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nome do médico parceiro:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      required
                      autoFocus
                    />
                  </Form.Group>
                </>
              ) : ''}
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Fechar
                </Button>
                <Button type="submit" variant="success">
                  Enviar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
}

export default Tabela;
