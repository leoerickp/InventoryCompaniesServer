import { inputNewCompany, ICompany, inputUpdatedCompany } from '../interfaces/company.interface';
import { Pagination } from '../interfaces/pagination.interface';
import { Company } from '../models/company';

export class CompaniesService {
    async create(newCompany: inputNewCompany): Promise<ICompany | undefined> {
        try {
            const company = await Company.create({ ...newCompany });
            return { ...company.dataValues };
        } catch (error) {
            throw new Error('NIT: duplicate key value violates primary key');
        }
    }

    async getAll({ limit = 10, offset = 0 }: Pagination) {
        try {
            const { count, rows } = await Company.findAndCountAll({
                limit,
                offset,
                order: [
                    ['NIT', 'ASC']
                ]
            });
            return { count, companies: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getOneByNIT(NIT: string) {
        const company = await Company.findByPk(NIT);
        if (!company) {
            throw new Error(`${NIT} not found`);
        }
        return company;
    }

    async update(NIT: string, updatedCompany: inputUpdatedCompany) {
        const company = await this.getOneByNIT(NIT);
        return await company.update({ ...updatedCompany });
    }

    async remove(NIT: string) {
        const company = await this.getOneByNIT(NIT);
        try {
            return await company.destroy();
        } catch (error) {
            throw new Error(`Company with NIT:${NIT} cannot be removed in the database`)
        }
    }

}