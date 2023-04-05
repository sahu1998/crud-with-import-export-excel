require("dotenv").config();

const {
  postData,
  getData,
  deleteData,
  putData,
  getPaginationData,
  getDataByQuery,
  workersModal,
} = require("../model");

const postDataController = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  console.log("post req body: ", req.body);
  console.log("post req json: ", req.json);
  let result;
  if (req.json) {
    result = await postData(req.json);
  } else {
    result = await postData(req.body);
  }

  res.send(result);
};

const getDataController = async (req, res) => {
  const result = await getData(req.query.id);
  res.send(result);
};

const getPaginationController = async (req, res) => {
  const skip = req.params.skip;
  const limit = req.params.limit;

  const result = await getPaginationData(skip, limit);
  res.send(result);
};

const searchDataController = async (req, res) => {
  const skip = req.params.skip;
  const limit = req.params.limit;
  const result = await getDataByQuery(req.query.key, skip, limit);
  res.send(result);
};

const deleteDataController = async (req, res) => {
  console.log(req.params);
  const result = await deleteData(req.params.id);
  res.send(result);
};

const putDataController = async (req, res) => {
  console.log("params:====", req.params);
  console.log("putController body:----", req.body);
  const result = await putData(req.params.id, req.body);
  res.send(result);
};

const putStatusController = async (req, res) => {
  const { id, status } = req.params;
  console.log("params:====", req.params.status);
  const data = await workersModal.findByIdAndUpdate(id, { $set: { status } });
  res.send({ data, status: 200 });
};

module.exports = {
  postDataController,
  getDataController,
  getPaginationController,
  deleteDataController,
  putDataController,
  putStatusController,
};
