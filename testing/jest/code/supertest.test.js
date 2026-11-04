// example code

import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import app from "../index.js";

test("Get All Users", async () => {
  const response = await request(app).get("/user");

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("success");
});

test("Create User", async () => {
  const response = await request(app).post("/user/create").send({
    name: "tester1",
    email: "tester1@example.com",
  });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("success");
});
