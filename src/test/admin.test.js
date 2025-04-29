import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app.js";

describe("Admin Login", () => {
  it("should return a token when login is correct", async () => {
    const response = await supertest(app).post("/api/admin/login").send({
      email: "admin3@example.com",
      password: "123456",
    });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });
  it("should return 401 when login is incorrect", async () => {
    const response = await supertest(app).post("/api/admin/login").send({
      email: "admin3@example.com",
      password: "wrongpassword",
    });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("message", "Invalid credentials");
  });
  it("should return 400 when email is not correct", async () => {
    const response = await supertest(app).post("/api/admin/login").send({
      email: "wrongemail@gmail.com",
      password: "123456",
    });
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("message", "Invalid credentials");
  });
});
