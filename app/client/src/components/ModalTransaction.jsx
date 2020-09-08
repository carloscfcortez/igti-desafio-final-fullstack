import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Icon,
  Modal,
  RadioGroup,
  Row,
  Select,
  Switch,
  TextInput,
} from "react-materialize";

export default function ModalTransaction({ data }) {
  const [dataUpdate, setDataUpdate] = useState();

  useEffect(() => {
    setDataUpdate(data);
  }, [data]);

  return (
    <Modal
      actions={[
        <Button flat modal="close" node="button" waves="green">
          Fechar
        </Button>,
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header="Edição de lançamento"
      id="modal1"
      open={false}
      options={{
        dismissible: true,
        endingTop: "30%",
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: "4%",
      }}
    >
      <Row>
        <Col s={12}>
          <RadioGroup
            label="Tipo de Lançamento"
            name="typeDespesa"
            options={[
              {
                label: "Despesa",
                value: "-",
              },
              {
                label: "Receita",
                value: "+",
              },
            ]}
            disabled={false}
            value={dataUpdate?.type}
            onChange={(event) =>
              setDataUpdate({ ...dataUpdate, type: event.target.value })
            }
            withGap
          />
        </Col>
      </Row>

      <Row>
        <Col s={12}>
          <TextInput
            l={12}
            label="Descrição"
            value={dataUpdate?.description}
            onChange={(event) =>
              setDataUpdate({ ...dataUpdate, description: event.target.value })
            }
          ></TextInput>
        </Col>
      </Row>

      <Row>
        <Col s={12} l={12}>
          <TextInput
            l={12}
            label="Categoria"
            value={dataUpdate?.category}
            onChange={(event) =>
              setDataUpdate({ ...dataUpdate, category: event.target.value })
            }
          ></TextInput>
        </Col>
      </Row>

      <Row>
        <Col s={6}>
          <TextInput
            label="Valor"
            type="number"
            value={dataUpdate?.value}
            onChange={(event) =>
              setDataUpdate({ ...dataUpdate, value: event.target.value })
            }
          ></TextInput>
        </Col>
        <Col s={6}>
          <TextInput
            label="Data"
            type="date"
            value={dataUpdate?.yearMonthDay}
            onChange={(event) =>
              setDataUpdate({ ...dataUpdate, yearMonthDay: event.target.value })
            }
          ></TextInput>
        </Col>
      </Row>
    </Modal>
  );
}
