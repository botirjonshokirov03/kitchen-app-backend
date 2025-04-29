import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app.js";

describe("Worker Check-In and Check-Out", () => {
  const username = "saracashier";
  const kitchenId = "680f3d3fa438ba9bbd427df6";

  it("should allow worker to check-in", async () => {
    const response = await supertest(app)
      .post("/api/workTrack/checkin")
      .send({ username, kitchenId });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message", "Check-In successful");
  });

  it("should allow worker to check-out", async () => {
    const response = await supertest(app)
      .post("/api/workTrack/checkout")
      .send({ username, kitchenId });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message", "Check-Out successful");
  });
});
