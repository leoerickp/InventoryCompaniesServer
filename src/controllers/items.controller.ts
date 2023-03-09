import { Response, Request } from 'express'
import { BadRequestException, NotFoundException } from '../helpers/error-messages-handler';
import { ItemsService } from '../services';

const itemsService = new ItemsService();
export class ItemsController {
    async create(req: Request, res: Response) {

        try {
            const newItem = await itemsService.create({ ...req.body });
            res.json({ ...newItem });
        } catch (error) {
            BadRequestException(error, res);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        const result = await itemsService.getAll({ ...req.query });
        res.json({ ...result });
    }

    async getAllByNIT(req: Request, res: Response): Promise<void> {
        const { NIT } = req.params;
        const result = await itemsService.getAllByNIT(NIT, { ...req.query });
        res.json({ ...result });
    }

    async getOneById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = await itemsService.getOne(id);
            res.json(item);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = await itemsService.update(id, { ...req.body });
            res.json(item);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const company = await itemsService.remove(id);
            res.json(company);
        } catch (error) {
            NotFoundException(error, res);
        }
    }
}