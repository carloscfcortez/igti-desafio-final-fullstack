const mongoose = require("mongoose");
const { findOneAndUpdate } = require("../models/TransactionModel");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const findAll = async (condition) => {
  const data = await TransactionModel.find(condition);
  return data;
};

const findOne = async (id) => {
  if (!id) throw new Error("id is required");
  const data = await TransactionModel.findById(id);
  return data;
};

const findGroupYearMonth = async () => {
  const aggregatorOpts = [{
    $group: {
      _id: { yearMonth: "$yearMonth", year: "$year", month: "$month" },
      count: { $sum: 1 }
    }
  }]
  const data = await TransactionModel.aggregate(aggregatorOpts).sort({'_id.year' : 1, '_id.month' : 1}).exec();
  return data;
};


const update = async (id, dataUpdate) => {
  await TransactionModel.updateOne({ _id: id }, dataUpdate);
  const data = await findOne(id);
  return data;
};

const remove = async (id) => {
  const data = await TransactionModel.findByIdAndDelete(id);
  return data;
};

const removeAll = async () => {
  await TransactionModel.deleteMany();
  return true;
};
const create = async (data) => {
  const resp = await TransactionModel.create(data);
  return resp;
};

module.exports = { create, findAll, findOne, update, remove, removeAll, findGroupYearMonth };
