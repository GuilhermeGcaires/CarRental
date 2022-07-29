import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userTokensResositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensResositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory, userTokensResositoryInMemory, dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })
  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "001234",
      email: "user@test.com",
      password: "1234",
      name: "Test user"
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(result).toHaveProperty("token");
  })
  it("Should not be able to authenticate a nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "nonexist@email.com",
      password: "1234",
    })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
  it("Should not be able to authenticate a invalid password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "User test fail",
    }
    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrect password"
    })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})