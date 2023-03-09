import { Response, Request } from 'express'
import { BadRequestException, NotFoundException } from '../helpers/error-messages-handler';
import { CompaniesService } from '../services';

const companiesService = new CompaniesService();
export class CompaniesController {
    async create(req: Request, res: Response) {

        try {
            const newCompany = await companiesService.create({ ...req.body });
            res.json({ ...newCompany });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const result = await companiesService.getAll({ ...req.query });
        res.json({ ...result });
    }
    async getOneByNIT(req: Request, res: Response) {
        try {
            const { NIT } = req.params;
            const company = await companiesService.getOneByNIT(NIT);
            res.json(company);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { NIT } = req.params;
            const company = await companiesService.update(NIT, { ...req.body });
            res.json(company);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async remove(req: Request, res: Response) {
        try {
            const { NIT } = req.params;
            const company = await companiesService.remove(NIT);
            res.json(company);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
}