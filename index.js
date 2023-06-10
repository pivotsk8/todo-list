const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo.routes");
require("dotenv").config();

//👉 Variable
const app = express();
const port = 3000;

//👉 Connection DB
mongoose.connect(process.env.CONNECTION_IN_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//👉 midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/todos", todoRouter);

app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvee");
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Error 500 ", error: err });
});

app.listen(port, () => {
  console.log(`Application run in port ${port} 😃 `);
});
