import React, { useState } from "react";
import { Formulario } from "../../../../componentes/Style/Formularios";
import Form from "react-bootstrap/Form";
import ErrorWrapper from "../../errors";
import "../../../../componentes/TabComponent/tabs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col } from "react-bootstrap";

const Atleta = () => {
  return (
      <Col>
        <Card>
          <Card.Body>
            <p>Nome:{null}</p>
            <p>Cpf:{null}</p>
            <p>Data de nascimento:{null}</p>
            <p>Sexo:{null}</p>
            <p>E-mail:{null}</p>
            <p>Categoria:{null}</p>
            <p>Cargo:{null}</p>
            <p>Modalidade:{null}</p>
            <p>Posição:{null}</p>
          </Card.Body>
        </Card>
      </Col>
  );
};

export default Atleta;
