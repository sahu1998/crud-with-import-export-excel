const express = require("express");
const {
  postDataController,
  getDataController,
  getPaginationController,
  deleteDataController,
  putDataController,
  putStatusController,
} = require("../controller");
const { jsonToExcel } = require("../middleware/json-to-excel");
const { convertExcelToJson } = require("../middleware/excel-to-json");
const { uploadFile } = require("../middleware/upload-file");
const route = express.Router();

route.use("/download-excel", jsonToExcel, express.static("storage"));

route.post("/post", postDataController);

route.post("/bulk-post", uploadFile, convertExcelToJson, postDataController);

route.get("/get", getDataController);

route.get("/get/:skip/:limit", getPaginationController);

route.get("/json-to-excel/:skip/:limit", jsonToExcel, (req, res) => {
  res.send(req.excelConverted);
});

route.delete("/delete/:id", deleteDataController);

route.put("/put/:id", putDataController);
route.put("/update-status/:id/:status", putStatusController);

module.exports = { route };
