import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import apiRouter from "./routes/api";

const port = process.env.PORT || 3001;
const frontendDir = process.env.FRONTEND_DIR
  ? [process.env.FRONTEND_DIR]
  : [__dirname, "../../client/build"];
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(...frontendDir)));

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get("*", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.resolve(...frontendDir, "index.html"));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
