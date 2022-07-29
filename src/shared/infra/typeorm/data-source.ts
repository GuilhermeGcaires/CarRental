import { DataSource } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserToken";


const dataSource = new DataSource({
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? "localhost" : "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === 'test' ? "carrental_test" : "carrental",
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User, UserTokens, Car, CarImage, Rental],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
})

dataSource.initialize()
  // .then(() => {
  //   console.log("Data Source has been initialized!")
  // })
  // .catch((err) => {
  //   console.error("Error during Data Source initialization", err)
  // })

export async function createConnection(): Promise<DataSource> {
  return dataSource.setOptions({
    type: 'postgres',
    host: 'localhost',
    database: process.env.NODE_ENV === 'test' ? "carrental_test" : "carrental"
  }).initialize()
}


export default dataSource