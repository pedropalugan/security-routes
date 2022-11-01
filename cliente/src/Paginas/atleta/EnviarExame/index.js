import axios from "axios";
import React, { useState } from "react";
import { Table, Button, Input } from "react-bootstrap";

function App() {
  const [file, setFile] = useState(null);

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("pic", file);
    axios.post("http://localhost:3000/postMeal", formData);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className="titulo bg-tabela text-white">
            <th>Exame:</th>
            <th>Médico:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark.pdf</td>
            <td>Mark</td>
          </tr>
        </tbody>
      </Table>
      <div className="text-center mt-5">
        <div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="mt-3">
          <Button variant="success" onClick={onFileUpload}>
            Enviar Exame
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
