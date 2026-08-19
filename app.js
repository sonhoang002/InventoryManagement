require("dotenv").config();

const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRoute");
const inventoryRouter = require("./routes/inventoryRoute");

const PORT = process.env.PORT || 5000;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/inventory", inventoryRouter);

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(PORT, console.log("Listening at PORT: " + PORT));
