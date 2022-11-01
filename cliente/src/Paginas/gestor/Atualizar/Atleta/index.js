import React, { useState } from "react";
import { Formulario } from "../../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import ErrorWrapper from "../../errors";

const Atleta = () => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);
  const [primeiro_nome, setPrimeiro_nome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cargo, setCargo] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [posição, setPosição] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function hasError(key) {
    return error.find((o) => o.key === key);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //validação
    var errors = [];

    //primeiro_nome
    if (primeiro_nome === "") {
      errors.push({
        key: "primeiro_nome",
        value: "Escreva o nome corretamente"
      });
    }

    //categoria
    if (categoria === "") {
      errors.push({
        key: "categoria",
        value: "Escreva a categoria corretamente"
      });
    }
    //cargo
    if (cargo === "") {
      errors.push({
        key: "cargo",
        value: "Escreva o cargo corretamente"
      });
    }
    //modalidade
    if (modalidade === "") {
      errors.push({
        key: "modalidade",
        value: "Escreva a modalidade corretamente"
      });
    }
    //senha
    if (senha <= 0) {
      errors.push({
        key: "senha",
        value: "Escreva a senha corretamente"
      });
    }
    //modalidade
    if (posição === "") {
      errors.push({
        key: "posição",
        value: "Escreva a posição corretamente"
      });
    }
    //cpf
    const validarCpf = /^\d{11}$/;
    var validCpf = validarCpf.test(Number(cpf));

    if (!validCpf) {
      errors.push({ key: "cpf", value: "Cpf invalido" });
    }
    //email
    const validarEmail = /\S+@\S+\./;
    var validEmail = validarEmail.test(String(email));

    if (!validEmail) {
      errors.push({ key: "email", value: "Email invalido" });
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
            Escreva corretamente o cpf
          </div>
        </Col>
        <Col>
          <Form.Label>Categoria:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("categoria") ? "form-control is-invalid" : "form-control"
            }
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          <ErrorWrapper msg={hasError("categoria")?.value} />
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
        <Col>
          <Form.Label>Cargo:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("cargo") ? "form-control is-invalid" : "form-control"
            }
            name="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <ErrorWrapper msg={hasError("cargo")?.value} />
        </Col>
        <Col>
          <Form.Label>Data de nascimento:</Form.Label>
          <Form.Control
            tipo="text"
            label="Data de nascimento"
            name="Data de nascimento"
          />
        </Col>
        <Col>
          <Form.Label>Modalidade:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("modalidade")
                ? "form-control is-invalid"
                : "form-control"
            }
            name="modalidade"
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
          />
          <ErrorWrapper msg={hasError("modalidade")?.value} />
        </Col>
        <Col>
          <Form.Label>Solicitação de exame:</Form.Label>
          <Form.Select>
            <option>Sexo</option>
            <option value="1">M</option>
            <option value="2">F</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Posição:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("posição") ? "form-control is-invalid" : "form-control"
            }
            name="posição"
            value={posição}
            onChange={(e) => setPosição(e.target.value)}
          />
          <ErrorWrapper msg={hasError("posição")?.value} />
        </Col>
        <Col>
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="email"
            className={
              hasError("email") ? "form-control is-invalid" : "form-control"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={hasError("email") ? "inline-errormsg" : "hidden"}>
            Escreva corretamente seu e-mail
          </div>
        </Col>
        <Col>
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="senha"
            className={
              hasError("senha") ? "form-control is-invalid" : "form-control"
            }
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className={hasError("senha") ? "inline-errormsg" : "hidden"}>
            Escreva corretamente sua senha
          </div>
        </Col>
      </Formulario>

      <Col>
        <div class="pt-4">
          <Button variant="success" size="sm" onClick={handleSubmit}>
            Atualizar
          </Button>{" "}
        </div>
      </Col>
    </main>
  );
};

export default Atleta;
