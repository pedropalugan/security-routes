import React, {useState} from 'react';
import './table.css';
import { Button, Table } from 'react-bootstrap';
import ExamesEnviados from '../ExamesEnviados'

function AvalicacoesRecebidas() {

  const [validar, setValidar] = useState(false)

  return (
    <>
      {validar ? (<ExamesEnviados />) : (<>
       <Table responsive striped bordered hover >
      <thead>
        <tr className="bg-tabela text-white" >
          <th >Nome do Atleta:</th>
          <th>CPF:</th>
          <th>Relação:</th>
          <th>Justificativa:</th>
          <th>Exame:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Atleta1</td>
          <td>111.111.111-11</td>
          <td>Aprovado</td>
          <td> </td>
          <td><Button variant="success" onClick={setValidar}>Visualizar</Button></td>
        </tr>
        <tr>
          <td>Atleta2</td>
          <td>111.111.111-11</td> 
          <td>Reprovado</td>
          <td> </td>
        </tr>
        <tr>
          <td>Atleta2</td>
          <td>111.111.111-11</td> 
          <td>Reprovado</td>
          <td> </td>
        </tr>
      </tbody>
    </Table>
    </>)
      }
    </>
  );
}

export default AvalicacoesRecebidas;
