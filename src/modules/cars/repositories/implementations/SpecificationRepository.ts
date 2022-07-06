import { Repository } from "typeorm";
import dataSource from "../../../../database/data-source";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
      this.repository = dataSource.getRepository(Specification)
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
      const specification = this.repository.create({
        description,
        name,
      })
      await this.repository.save(specification)

    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ where: { name }})

        return specification;
    }

}

export { SpecificationsRepository }