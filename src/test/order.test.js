import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app.js";

describe("Order Management", () => {
  let cashierToken;
  let waiterId;
  let tableNumber = 3;

  before(async () => {
    // Login as Cashier
    const response = await supertest(app).post("/api/worker/login").send({
      username: "saracashier",
      password: "123456",
      kitchenId: "680f3d3fa438ba9bbd427df6",
    });

    cashierToken = response.body.token;

    // You must have waiterId ready
    waiterId = "6810584a46c83de470cfafb7";
  });

  it("should create a new order", async () => {
    const response = await supertest(app)
      .post("/api/worker/orders")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({
        tableNumber: tableNumber,
        waiterId: waiterId,
        kitchenName: "Test Kitchen",
        serviceFee: 5,
        discount: 0,
        items: [
          {
            productName: "Test Product",
            price: 10,
            quantity: 2,
          },
        ],
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("tableNumber", tableNumber);
    expect(response.body).to.have.property("totalPrice");
  });
});
