import React, { useEffect, useState, Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Icon,
  Modal,
  Row,
  Select,
  TextInput,
} from "react-materialize";

import ModalTransaction from "./../components/ModalTransaction";

import api from "./../services/api";

export default function Transaction() {
  const [yearMonth, setYearMonth] = useState();
  const [data, setData] = useState([]);
  const [card, setCard] = useState([]);
  const [yearnMonths, setYearMonths] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [amountRevenue, setAmountRevenue] = useState(0);
  const [amountExpenses, setAmountExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const [rowEdit, setRowEdit] = useState();
  const [open, setOpen] = useState(false);

  const [valueFilter, setValueFilter] = useState();

  // String.prototype.contains = function contains(charToCheck) {
  //   return this.toLowerCase()
  //     .split("")
  //     .some(
  //       (char) =>
  //         char.localeCompare(charToCheck.toLowerCase(), "pt-BR", {
  //           sensitivity: "base",
  //         }) === 0
  //     );
  // };

  // String.prototype.contains = function contains(b) {
  //   return !!this.toLowerCase()

  //     .split("")
  //     .filter(
  //       (v, i) =>
  //         this.slice(i, b.length).localeCompare(b.toLowerCase(), "pt-br", {
  //           sensitivity: "base",
  //         }) === 0
  //     ).length;
  // };

  // String.prototype.contains = function contains(b) {
  //   return (
  //     this.toLowerCase()
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/gi, "")
  //       .indexOf(
  //         b
  //           .toLowerCase()
  //           .normalize("NFD")
  //           .replace(/[\u0300-\u036f]/gi, "")
  //       ) === 0
  //   );
  // };

  useEffect(() => {
    if (valueFilter?.length >= 3) {
      let x = data;
      let filterNormalize = valueFilter
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gi, "");
      let newData = x.filter((item) => {
        let itemNormalize = item.description
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/gi, "");

        console.log(item.description);
        console.log(valueFilter);
        // console.log(itemNormalize.indexOf(filterNormalize));
        return itemNormalize.indexOf(filterNormalize) >= 0 ? item : null;

        // console.log(item.description.contains(valueFilter));
        // return item.description.contains(valueFilter) ? item : null;
      });

      console.log(newData);
      setCard(newData);
    } else {
      setCard(data);
    }
  }, [valueFilter]);

  let timer = 500;
  let timeOut = {};
  const handleFilter = (value) => {
    clearTimeout(timeOut);
    if (value?.length >= 3) {
      timeOut = setTimeout(() => {
        setValueFilter(value);
      }, timer);
    }

    if (!value) setValueFilter(value);
  };

  useEffect(() => {
    async function getGroupsYearsMonth() {
      const response = await api.get("/api/transaction/group/year-month");
      if (response.status === 200) {
        setYearMonths(response.data);
        setYearMonth(response?.data[0]?.yearMonth);
      }
    }

    getGroupsYearsMonth();
  }, []);

  useEffect(() => {
    async function getData() {
      //   return true;
      const response = await api.get(`/api/transaction?period=${yearMonth}`);
      if (response.status === 200) {
        setData(response.data);
        setCard(response.data);
      }
    }

    if (!!yearMonth) getData();
  }, [yearMonth, yearnMonths]);

  useEffect(() => {
    const calculateAmounts = () => {
      if (card) {
        setTotalItems(card.length);

        let revenue = 0;
        let expenses = 0;
        card.forEach((item) => {
          if (item.type === "+") {
            revenue = revenue + parseFloat(item.value);
          } else {
            expenses = expenses + parseFloat(item.value);
          }
        });

        setAmountRevenue(revenue.toFixed(2));
        setAmountExpenses(expenses.toFixed(2));
        setBalance((revenue - expenses).toFixed(2));
      }
    };
    calculateAmounts();
  }, [card, valueFilter]);

  const handleEdit = (item) => {
    setRowEdit(item);
    setOpen(true);
  };

  const handleNext = () => {
    const index = yearnMonths.findIndex((x) => x.yearMonth === yearMonth);
    if (yearnMonths.length > index) {
      let nextMonth = yearnMonths[index + 1]?.yearMonth;
      setYearMonth(nextMonth);
    }
  };

  const handlePrevious = () => {
    const index = yearnMonths.findIndex((x) => x.yearMonth === yearMonth);
    if (index > 0) {
      let previusMonth = yearnMonths[index + 1]?.yearMonth;
      setYearMonth(previusMonth);
    }
  };

  return (
    <Fragment>
      <ModalTransaction data={rowEdit} open={open} setOpen={setOpen} />
      <Container className="fluid" style={{ flex: 1 }}>
        <Row>
          <Col offset="s4">
            <Row>
              <Col style={{ paddingTop: 23 }}>
                <Button onClick={handlePrevious}>
                  <Icon>chevron_left</Icon>
                </Button>
              </Col>
              <Col>
                <Select
                  id="month_year"
                  multiple={false}
                  // onChange={function noRefCheck() {}}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value={yearMonth}
                  onChange={(event) => setYearMonth(event.target.value)}
                >
                  {yearnMonths?.map((item) => {
                    return (
                      <option key={item?.yearMonth} value={item?.yearMonth}>
                        {item?.monthStr}/{item?.year}
                      </option>
                    );
                  })}
                </Select>
              </Col>
              <Col style={{ paddingTop: 23 }}>
                <Button onClick={handleNext}>
                  <Icon>chevron_right</Icon>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col s="12">
            <Card style={{ padding: 20 }}>
              <Row>
                <Col s="3">
                  <b>Lançamentos</b>
                  <p className="blue-text">{totalItems}</p>
                </Col>
                <Col s="3">
                  <b>Receitas</b>
                  <p className="green-text">R$ {amountRevenue}</p>
                </Col>
                <Col s="3">
                  <b>Despesas</b>
                  <p className="red-text">R$ {amountExpenses}</p>
                </Col>
                <Col s="3">
                  <b>Saldo</b>
                  <p className="green-text">R$ {balance}</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingTop: 26 }} s={1}>
            <Button>Adicionar</Button>
          </Col>
          <Col s={11}>
            <TextInput
              s={12}
              label="Filtro"
              onChange={(event) => handleFilter(event.target.value)}
            ></TextInput>
          </Col>
        </Row>
        <Row>
          {card
            ? card?.map((item) => {
                return (
                  <Col key={item._id} s={12}>
                    <Card
                      className={
                        item.type === "+" ? "green lighten-3" : "red lighten-3"
                      }
                    >
                      <Row style={{ paddingTop: 15 }}>
                        <Col style={{ marginTop: 10, marginLeft: 10 }}>
                          <b>{item.day}</b>
                        </Col>
                        <Col s="6">
                          <Row>
                            <b>{item.category}</b>
                            <p>{item.description}</p>
                          </Row>
                        </Col>
                        <Col s="1" offset="s2">
                          <Row>
                            <p style={{ fontSize: 24 }}>R$ {item.value}</p>
                          </Row>
                        </Col>
                        <Col offset="s1">
                          <Button
                            className="blue"
                            // href="#modal1"
                            node="button"
                            onClick={() => handleEdit(item)}
                          >
                            <Icon>create</Icon>
                          </Button>{" "}
                          <Button className="red">
                            <Icon>delete</Icon>
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })
            : ""}
        </Row>
      </Container>
    </Fragment>
  );
}
