import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";

import db from "./config/connection";
import apiRouter from "./routes";
const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(port, function () {
  console.log(`Started application on port 5000`);
  db.then((data) => {
    console.log(
      `Database connection Established with ${data.connection.name}!`
    );
  }).catch((err) => {
    console.log({ err });
    console.log("Error connecting to Database!");
  });
});
