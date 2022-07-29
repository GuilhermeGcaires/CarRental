import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid"
import request from "supertest";

import { app } from "@shared/infra/app";
import { createConnection } from "@shared/infra/typeorm/data-source";
import { Connection } from "typeorm";

let connection: Connection
describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()

    
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
        values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXX')
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions")
    .send({
      email: "admin@admin.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body;

    await request(app)
    .post("/categories")
    .send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");

  })

})