const express = require("express");
const { route } = require("./api/routes");
const cors = require("cors");

require("dotenv").config();
require("./dbConnection");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", route);

app.listen(process.env.PORT, () => {
  console.log(`listening port ${process.env.PORT}`);
});
