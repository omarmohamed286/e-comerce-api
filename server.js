const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

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

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const server = app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`UnhandeledRejection Error: ${err}`);
  server.close(() => {
    console.error('Shutting down ..')
    process.exit(1);
  });
});
