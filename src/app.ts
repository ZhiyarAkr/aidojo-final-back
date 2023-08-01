import express from "express";
import { attachControllers } from "@decorators/express";
import HfController from "./controllers/HfController";
import AuthController from "./controllers/AuthController";
import cors from "cors";
import "reflect-metadata";
import database from "./database/Database";
import TextController from "./controllers/TextController";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

const launch = async () => {
  await database.initialize();
  await attachControllers(app, [HfController, AuthController, TextController]);
  app.listen(port, () => {
    console.log(`started listening on port http://localhost/${port}`);
  });
};

launch();
