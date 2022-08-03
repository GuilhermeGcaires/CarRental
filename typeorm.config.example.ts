import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "",
  username: "",
  password: "",
  database: "",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
}
)