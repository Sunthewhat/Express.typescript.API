import connection from "../database";
import Test from "../model/test.model";

interface ITestService {
  helloWorld(): Promise<string>;
  save(Test: Test): Promise<Test>;
  retrieveAll(searchParams: { id: number; msg: string }): Promise<Test[]>;
  retrieveById(TestId: number): Promise<Test | undefined>;
  update(Test: Test): Promise<number>;
  delete(TestId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class TestService implements ITestService {
  helloWorld(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello World!");
      }, 0);
    });
  }

  save(Test: Test): Promise<Test> {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO test (msg) VALUES(?)",
        [Test.msg],
        (err: any, res: { insertId: number }) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((Test) => resolve(Test!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: { msg?: string }): Promise<Test[]> {
    let query: string = "SELECT * FROM test";
    let condition: string = "";

    if (searchParams?.msg)
      condition += `LOWER(msg) LIKE '%${searchParams.msg}%'`;

    if (condition.length) query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query(query, (err: any, res: any) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(TestId: number): Promise<Test> {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM test WHERE id = ?",
        [TestId],
        (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(Test: Test): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE test SET msg = ? WHERE id = ?",
        [Test.id, Test.msg],
        (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(testId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM test WHERE id = ?",
        [testId],
        (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM test", (err: any, res: any) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new TestService();
