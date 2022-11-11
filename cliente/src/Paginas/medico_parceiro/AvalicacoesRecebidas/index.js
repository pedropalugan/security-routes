import React, {useEffect, useState} from 'react';
import './table.css';
import { Button, Table } from 'react-bootstrap';
import ExamesEnviados from '../ExamesEnviados'
import axios from 'axios';

function AvalicacoesRecebidas({ atleta }) {

  const [validar, setValidar] = useState(false)
  
  const [nomes, setNomes] = useState([])
  const [cpf, setCpf] = useState([])
  const [situacao, setSituacao] = useState([])


  useEffect(() => {
    axios.post('http://localhost:3000/medicoConv/verAtletas', {
      atletas : atleta
    })
    .then((response) => response.data)
    .then((response) => {
      setNomes(response['nomes'])
      setSituacao(response['relacao'])
      setCpf(response['cpf'])
    })
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
        {nomes.map((nomes, index) => {
          console.log(cpf[index])
          return(
            <tr>
              <td>{nomes}</td>
              <td>{cpf[index]}</td>
              <td>{situacao[index]}</td>
              <td></td>
              <td></td>
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
