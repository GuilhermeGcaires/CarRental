import { CarsImageRepository } from "@modules/cars/infra/repositories/CarsImageRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImageRepository: ICarsImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async(image) => {
      await this.carsImageRepository.create(car_id, image)
    });
  }
}

export { UploadCarImagesUseCase };