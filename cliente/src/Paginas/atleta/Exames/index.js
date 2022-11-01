import React, { useState } from "react";
import { Button, ButtonGroup, Table, Form } from "react-bootstrap";
import {saveAs} from 'file-saver';
import EnviarExame from '../EnviarExame'

function AvalicacoesPendentes() {

  const [download,setDownload] = useState('https://avatars.githubusercontent.com/u/91327153?v=4')
  const [enviar,setEnviar] = useState(false)

  function downloadFile() {
    saveAs(download);
  }


  return (
    <>
    {enviar ? <EnviarExame />: <><Form.Group className="w-25 form mb-3">
        <Form.Label>Buscar:</Form.Label>
        <Form.Control className="buscar" type="text" placeholder="" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr className="titulo bg-tabela text-white">
            <th >Nome do Exame:</th>
            <th >Situação:</th>
            <th >Enviar Exame:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Button variant="success" size="sm" onClick={downloadFile}>Mark.pdf</Button></td>
            <td>Mark</td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success" className="btn" onClick={setEnviar}>Enviar</Button>
              </ButtonGroup>
            </td>

          </tr>
          <tr>
            <td><Button variant="success" size="sm" onClick={downloadFile}>Mark.pdf</Button></td>
            <td>Jacob</td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success" onClick={setEnviar}>Enviar</Button>
              </ButtonGroup>
            </td>

          </tr>
          <tr>
            <td><Button variant="success" size="sm" onClick={downloadFile}>Mark.pdf</Button></td>
            <td>Larry the Bird</td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success" onClick={setEnviar}>Enviar</Button>
              </ButtonGroup>
            </td>
          </tr>
          <tr>
            <td><Button variant="success" size="sm" onClick={downloadFile}>Mark.pdf</Button></td>
            <td>Anne</td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success" onClick={setEnviar}>Enviar</Button>
              </ButtonGroup>
            </td>
          </tr>
        </tbody>
      </Table></>}

    </>
  );
}

export default AvalicacoesPendentes;
