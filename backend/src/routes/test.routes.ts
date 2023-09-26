import { Router } from "express";
import testController from "../controller/test.controller";

class TestRoutes {
  router = Router();
  controller = new testController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/helloworld", this.controller.helloWorld);
    this.router.post("/create", this.controller.createTest);
    this.router.get("/retrieve/all", this.controller.retrieveAllTests);
    this.router.get("/retrieve/:id", this.controller.retrieveTestById);
    this.router.put("/update/:id", this.controller.updateTest);
    this.router.delete("/delete/:id", this.controller.deleteTest);
    this.router.delete("/delete/all", this.controller.deleteAllTests);
  }
}

export default new TestRoutes().router;
