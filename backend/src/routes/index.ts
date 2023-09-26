import { Application } from "express";
import testRoutes from "./test.routes";

class Routes {
  constructor(app: Application) {
    app.use("/test", testRoutes);
  }
}

export default Routes;
