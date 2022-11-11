import React, {useEffect, useState} from 'react';
import './table.css';
import { Button, Table } from 'react-bootstrap';
import ExamesEnviados from '../ExamesEnviados'
import axios from 'axios';

function AvalicacoesRecebidas({ atleta }) {

  const [validar, setValidar] = useState(false)


  useEffect(() => {
    axios.post('http://localhost:3000/medicoConv/verAtletas', {
      atletas : atleta
    })
    .then((response) => response.data)
    .then((response) => console.log(response))
  }, [atleta])

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
        {atleta.map((atleta, index) => {
          return(
            <tr>
              <td>{atleta}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </>)
      }
    </>
  );
}

export default AvalicacoesRecebidas;
