require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const refreshTokensRouter = require("./routes/refreshTokens");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "*", // Mengizinkan semua asal
    methods: ["GET", "POST", "PUT", "DELETE"], // Metode yang diizinkan
    credentials: true, // Izinkan cookie (jika diperlukan)
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/refresh-tokens", refreshTokensRouter);

module.exports = app;
