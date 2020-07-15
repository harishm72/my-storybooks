const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");

const connectDB = require("./config/db");

// configure env file
dotenv.config({ path: "./config/config.env" });

// make a connection to db
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//handlebars template engine
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`)
);
