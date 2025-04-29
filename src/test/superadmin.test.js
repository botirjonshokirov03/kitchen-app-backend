import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import { app } from "../app.js";

describe("SuperAdmin Login", () => {
  it("should return a token when login is correct", async () => {
    const response = await supertest(app)
      .post("/api/superadmin/login")
      .send({ email: "superadmin@gmail.com", password: "123456" });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });

  it("should return 401 when login is incorrect", async () => {
    const response = await supertest(app)
      .post("/api/superadmin/login")
      .send({ email: "superadmin@gmail.com", password: "wrongpassword" });
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property(
      "message",
      "Invalid SuperAdmin credentials"
    );
  });
});
