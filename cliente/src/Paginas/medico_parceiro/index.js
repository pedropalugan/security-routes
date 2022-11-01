import React, { useState } from "react";
import { Container, ToggleButton, ButtonGroup, Card } from "react-bootstrap";
import AvalicacoesRecebidas from "./AvalicacoesRecebidas";

const Medico = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const botoes = [
    { name: "Avalicações Recebidas", value: "tab2" },
  ];

  return (
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

      <Card className="mt-3">
        <Card.Body>
          {/* {activeTab === "tab1" && <AvalicacoesRecebidas />} */}
          <AvalicacoesRecebidas />
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Medico;