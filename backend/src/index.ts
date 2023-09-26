import express, { Application } from "express";
import cors from "cors";
import corsConfig from "./configs/corsConfig";
import Routes from "./routes";
import cookieParser from "cookie-parser";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    app.use(cors(corsConfig()));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
  }
}
