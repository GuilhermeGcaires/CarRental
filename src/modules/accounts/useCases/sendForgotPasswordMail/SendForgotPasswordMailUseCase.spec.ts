import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "43215",
      email: "testing1@user.com",
      name: "User Test1",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("testing1@user.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("notexist@email.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "testing2@user.com",
      name: "Garrosh",
      password: "14452",
    });

    await sendForgotPasswordMailUseCase.execute("testing2@user.com");

    expect(generateTokenMail).toBeCalled();
  });
});
