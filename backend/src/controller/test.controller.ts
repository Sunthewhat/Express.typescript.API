import { Request, Response } from "express";
import Test from "../model/test.model";
import TestService from "../services/test.service";

export default class TestController {
  async helloWorld(req: Request, res: Response) {
    try {
      const test = await TestService.helloWorld();
      res.status(200).json(test);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createTest(req: Request, res: Response) {
    try {
      const newTest: Test = {
        msg: req.body.msg || Math.random().toString(),
      };
      const savedTest: Test = await TestService.save(newTest);
      res.status(201).json(savedTest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async retrieveAllTests(req: Request, res: Response) {
    try {
      const searchParams = {
        msg: req.query.msg as string | undefined,
      };
      const tests: Test[] = await TestService.retrieveAll(searchParams);
      res.status(200).json(tests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async retrieveTestById(req: Request, res: Response) {
    try {
      const TestId: number = parseInt(req.params.id);
      const Test: Test | undefined = await TestService.retrieveById(TestId);
      if (!Test) res.status(404).json({ error: "Test not found" });
      else res.status(200).json(Test);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateTest(req: Request, res: Response) {
    try {
      const TestId: number = parseInt(req.params.id);
      const Test: Test | undefined = await TestService.retrieveById(TestId);
      if (!Test) res.status(404).json({ error: "Test not found" });
      else {
        const updatedTest: Test = {
          id: TestId,
          msg: req.body.msg || Test.msg,
        };
        await TestService.update(updatedTest);
        res.status(200).json(updatedTest);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async deleteTest(req: Request, res: Response) {
    try {
      const TestId: number = parseInt(req.params.id);
      const Test: Test | undefined = await TestService.retrieveById(TestId);
      if (!Test) res.status(404).json({ error: "Test not found" });
      else {
        await TestService.delete(TestId);
        res.status(200).json({ message: "Test deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteAllTests(req: Request, res: Response) {
    try {
      await TestService.deleteAll();
      res.status(200).json({ message: "All tests deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
