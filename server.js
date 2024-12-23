const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");


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
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

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
    console.error("Shutting down ..");
    process.exit(1);
  });
});
