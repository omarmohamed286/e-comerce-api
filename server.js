const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

dotenv.config({ path: "config.env" });

dbConnection();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

if (process.env.NODE_ENV == "Development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}


app.use("/api/v1/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
