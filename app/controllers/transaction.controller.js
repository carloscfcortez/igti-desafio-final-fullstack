// import { db } from '../models/index.js';
// const TransactionModel = require('../models/TransactionModel');
const TransactionService = require("./../services/transactionService.js");

const create = async (req, res) => {
  try {
    const data = await TransactionService.create(req.body);
    console.info(`POST /transaction - ${JSON.stringify(data)}`);

    res.json(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    console.error(`POST /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res, next) => {
  const period = req.query.period;

  try {

    if (!period) throw new Error("É necessário informar o prâmetro period");
    //condicao para o filtro no findAll
    var condition = period ? { yearMonth: period } : {};

    console.info(`GET /transaction`);
    const data = await TransactionService.findAll(condition);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    console.error(`GET /transaction - ${JSON.stringify(error.message)}`);

    next(error);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    console.info(`GET /transaction - ${id}`);
    const data = await TransactionService.findOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o transaction id: " + id });
    console.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findGroupYearMonth = async (req, res) => {
  try {
    const data = await TransactionService.findGroupYearMonth();

    const newData = data.map((item) => {
      const { year, yearMonth, month } = item._id;
      let monthStr = getMonth(month);
      return {
        year,
        yearMonth,
        month,
        monthStr,
      };
    });

    res.json(newData);
  } catch (error) {
    res.status(500).send({ message: "Erro ao agrupar" + error });
    console.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

function getMonth(month) {
  switch (month) {
    case 1:
      return "Jan";
      break;
    case 2:
      return "Fev";
      break;
    case 3:
      return "Mar";
      break;
    case 4:
      return "Abr";
      break;
    case 5:
      return "Mai";
      break;
    case 6:
      return "Jun";
      break;
    case 7:
      return "Jul";
      break;
    case 8:
      return "Ago";
      break;
    case 9:
      return "Set";
      break;
    case 10:
      return "Out";
      break;
    case 11:
      return "Nov";
      break;
    case 12:
      return "Dez";
      break;
    default:
      break;
  }
}

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    console.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
    const data = await TransactionService.update(id, req.body);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar a transaction id: " + id });
    console.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    console.info(`DELETE /transaction - ${id}`);
    const data = await TransactionService.remove(id);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o transaction id: " + id });
    console.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    console.info(`DELETE /transaction`);
    await TransactionService.removeAll();
    res.send(true);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Transactions" });
    console.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

//export default { create, findAll, findOne, update, remove, removeAll };

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
  findGroupYearMonth,
};
