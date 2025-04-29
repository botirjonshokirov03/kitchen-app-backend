import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app.js";

describe("Category Management", () => {
  let adminToken;

  before(async () => {
    // Login as Admin
    const response = await supertest(app)
      .post("/api/admin/login")
      .send({ email: "admin3@example.com", password: "123456" });

    adminToken = response.body.token;
  });

  it("should create a new category", async () => {
    const response = await supertest(app)
      .post("/api/admin/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Drinks" });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name", "Drinks");
  });

  it("should get all categories", async () => {
    const response = await supertest(app)
      .get("/api/admin/categories")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
});
