import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorWrapper from "../../errors";
import { Formulario } from "../../../../componentes/Style/Formularios";
import React, { useState } from "react";

function Medico() {
  const [primeiro_nome, setPrimeiro_nome] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);

  function hasError(key) {
    return error.find((o) => o.key === key);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //VALIDATE
    var errors = [];

    //primeiro_nome
    if (primeiro_nome === "") {
      errors.push({
        key: "primeiro_nome",
        value: "Escreva seu nome corretamente!"
      });
    }

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
          <Form.Control
            autoComplete="off"
            className={
              hasError("primeiro_nome")
                ? "form-control is-invalid"
                : "form-control"
            }
            name="primeiro_nome"
            value={primeiro_nome}
            onChange={(e) => setPrimeiro_nome(e.target.value)}
          />
          <ErrorWrapper msg={hasError("primeiro_nome")?.value} />
        </Col>
      </Formulario>

      <Col>
        <div class="pt-4">
          <button className="btn btn-success " onClick={handleSubmit}>
            Deletar
          </button>
        </div>
      </Col>
    </main>
  );
}
export default Medico;
