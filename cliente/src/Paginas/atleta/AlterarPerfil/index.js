import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function AlterarPerfil() {

  

  return (
    <Container className='mt-5'>
        <Form>
        <Row>
          <Col>  
          <Form.Group className="mb-4">
            <Form.Label>CPF do Atleta:</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Nome do Atleta:</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
          </Form.Group>
        
          <Form.Group className="mb-4">
            <Form.Label>Esporte:</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
          </Form.Group>

          </Col>
          <Col>

          <Form.Group className="mb-4">
          <Form.Label>Médico:</Form.Label>
          <Form.Control type="text" placeholder="" disabled />
          </Form.Group>

          <Form.Group className="mb-4">
          <Form.Label>Relação:</Form.Label>
          <Form.Control type="text" placeholder="" disabled />
          </Form.Group>

          <Form.Group className="mb-4">
          <Form.Label>Número de Telefone::</Form.Label>
          <Form.Control type="tel" placeholder="" />
          </Form.Group>
          </Col>
          </Row>
          <div className='text-center'>
            <Button variant="success mt-4">Enviar</Button>
          </div>

        </Form>
    </Container>
  );
}

export default AlterarPerfil;