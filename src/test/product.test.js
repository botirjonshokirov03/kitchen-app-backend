import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app.js";

describe("Product Management", () => {
  let adminToken;
  let createdCategoryId;
  let createdProductId;

  before(async () => {
    // Login as Admin
    const response = await supertest(app)
      .post("/api/admin/login")
      .send({ email: "admin3@example.com", password: "123456" });

    adminToken = response.body.token;

    const categoryRes = await supertest(app)
      .post("/api/admin/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Test Category" });

    createdCategoryId = categoryRes.body._id;
  });

  it("should create a new product", async () => {
    const response = await supertest(app)
      .post("/api/admin/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Product",
        price: 9.99,
        description: "Test description",
        categoryId: createdCategoryId,
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name", "Test Product");
    createdProductId = response.body._id;
  });

  it("should get all products", async () => {
    const response = await supertest(app)
      .get("/api/admin/products")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
});
