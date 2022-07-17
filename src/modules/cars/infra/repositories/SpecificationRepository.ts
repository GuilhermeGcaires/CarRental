import { In, Repository } from "typeorm";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationRepository";
import { Specification } from "../typeorm/entities/Specification";
import dataSource from "@shared/infra/typeorm/data-source";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
      this.repository = dataSource.getRepository(Specification)
    }


    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
      const specification = this.repository.create({
        description,
        name,
      })
      await this.repository.save(specification)

      return specification;
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ where: { name }})

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
      const specifications = await this.repository.findByIds(ids)
      return specifications;
    }
}

export { SpecificationsRepository }