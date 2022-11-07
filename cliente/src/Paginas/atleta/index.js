import React, { useState, useContext } from "react";
import { Container, ToggleButton, ButtonGroup, Card } from "react-bootstrap";
import Exames from "./Exames";
import AlterarPerfil from "./AlterarPerfil";
import './styleAtleta.css';
import Header from '../../componentes/Header/Header';
import { UserContext } from "../login";



const Medico = () => {

  const [activeTab, setActiveTab] = useState("tab1");

  const botoes = [
    { name: "Alterar Perfil", value: "tab1" },
    { name: "Exames", value: "tab2" },
  ];

  console.log(UserContext)


  return (
    <>
    <Header/>
    <Container className="mt-5">
      <h6 className="fw-normal text-start">Serviços:</h6>

      <ButtonGroup className="w-25">
        {botoes.map((botao, id) => (
          <ToggleButton
            key={id}
            className="rounded-0 me-2"
            size="sm"
            variant="outline-secondary"
            active={activeTab === botao.value}
            value={botao.value}
            onClick={() => {
              setActiveTab(botao.value);
            }}
          >
            {botao.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <Card className="mt-3 mb-5">
        <Card.Body>
          {activeTab === "tab1" && <AlterarPerfil />}
          {activeTab === "tab2" && <Exames />}
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};
export default Medico;