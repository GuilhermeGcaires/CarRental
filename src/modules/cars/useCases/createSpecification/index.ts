import { SpecificationsRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";



const specificationRepository = new SpecificationsRepository();
const createspecificationUseCase =  new CreateSpecificationUseCase(specificationRepository);
const createSpecificationController = new CreateSpecificationController(createspecificationUseCase);

export { createSpecificationController };