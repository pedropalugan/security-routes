import "../../../componentes/TabComponent/tabs.css";
import React from "react";
import Atleta from "../Atualizar/Atleta/index";
import Medico from "../Atualizar/Medico/index";
import Medico_parceiro from "../Atualizar/Medico_parceiro/index";
import Gestor from "../Atualizar/Gestor/index";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Atualizar = () => {
  const [tela, setTela] = React.useState("Atleta");

  return (
    <div className="App">
      <div>
        <Form.Select
          name="Tela"
          id="Tela"
          onChange={(e) => setTela(e.target.value)}
        >
          <option value="Atleta">Atleta</option>
          <option value="Medico">Medico</option>
          <option value="Medico_parceiro">Medico parceiro</option>
          <option value="Gestor">Gestor</option>
        </Form.Select>

        <div className="Container_tab">
          {tela === "Atleta" && <Atleta />}
          {tela === "Medico" && <Medico />}
          {tela === "Medico_parceiro" && <Medico_parceiro />}
          {tela === "Gestor" && <Gestor />}
        </div>
      </div>
    </div>
  );
};

export default Atualizar;
