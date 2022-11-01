import React, { useState } from "react";
import {  Card, Col, Button } from "react-bootstrap";
import ErrorWrapper from "../../errors";
import "../../../../componentes/TabComponent/tabs.css";

const Medico_parceiro = () => {
  return (
      <Col>
        <Card>
          <Card.Body>
            <p>Nome:{null}</p>
            <p>Cpf:{null}</p>
            <p>CRM:{null}</p>
            <p>Sexo:{null}</p>
            <p>E-mail:{null}</p>
            <p>Especialidade:{null}</p>
          </Card.Body>
        </Card>
      </Col>
  );
};

export default Medico_parceiro;
