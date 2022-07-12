
import { DataSource } from "typeorm";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";


const dataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "carrental",
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User],
  migrations: ["./src/shared/infra/typerorm/migrations/*.ts"],
  subscribers: [],  
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
  
export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize()
}

export default dataSource