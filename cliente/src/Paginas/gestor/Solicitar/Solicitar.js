import React, { useState } from "react";
import { Formulario } from "../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorWrapper from "../errors";

const Solicitar = () => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);

  function hasError(key) {
    return error.find((o) => o.key === key);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //validação
    var errors = [];

    //cpf
    const validarCpf = /^\d{11}$/;
    var validCpf = validarCpf.test(Number(cpf));

    if (!validCpf) {
      errors.push({ key: "cpf", value: "Cpf invalido" });
    }

    setError(errors);

    if (errors.length > 0) {
      return false;
    } else {
      alert("validado");
    }
  };

  return (
    <main>
      <Formulario action="">
        <Col>
          <Form.Label>Cpf:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="cpf"
            className={
              hasError("cpf") ? "form-control is-invalid" : "form-control"
            }
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <div className={hasError("cpf") ? "inline-errormsg" : "hidden"}>
            Escreva corretamente seu cpf
          </div>
        </Col>
        <Col>
          <Form.Label>Nome:</Form.Label>
          <Form.Control readOnly type="text" name="Nome" />
        </Col>
        <Col>
          <Form.Label>Relação:</Form.Label>
          <Form.Control readOnly type="text" name="Relação" />
        </Col>
        <Col>
          <Form.Label>Solicitação de exame:</Form.Label>
          <Form.Control
            readOnly
            type="text"
            placeholder=""
            name="Solicitação de exame"
          />
        </Col>
        <Col>
          <Form.Label>Esporte:</Form.Label>
          <Form.Control readOnly type="text" placeholder="" name="Esporte" />
        </Col>
        <Col>
          <Form.Label>Justificativa:</Form.Label>
          <Form.Control readOnly type="text" name="Justificativa" />
        </Col>
        <Col>
          <Form.Label>Medico:</Form.Label>
          <Form.Control tipe="text" name="Medico" />
        </Col>
      </Formulario>
      <Col>
        <div class="pt-4">
          <Button variant="success" size="sm" onClick={handleSubmit}>
            Solicitar avaliação
          </Button>
        </div>
      </Col>
    </main>
  );
};

export default Solicitar;
