import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "abc",
  username: "docker",
  password: "ignite",
  database: "carrental",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
}
)