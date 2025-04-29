import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app.js";

describe("Worker Login", () => {
  it("should return a token when login is correct", async () => {
    const response = await supertest(app).post("/api/worker/login").send({
      username: "saracashier",
      password: "123456",
      kitchenId: "680f3d3fa438ba9bbd427df6",
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });

  it("should return 400 when username is wrong", async () => {
    const response = await supertest(app).post("/api/worker/login").send({
      username: "wrongworker",
      password: "123456",
      kitchenId: "680f3d3fa438ba9bbd427df6",
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("message", "Worker not found");
  });

  it("should return 400 when password is wrong", async () => {
    const response = await supertest(app).post("/api/worker/login").send({
      username: "saracashier",
      password: "wrongpassword",
      kitchenId: "680f3d3fa438ba9bbd427df6",
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("message", "Invalid password");
  });
});
