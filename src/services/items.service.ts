import { IItem, inputNewItem, inputUpdatedItem } from '../interfaces/item.interface';
import { Item } from '../models/item';
import { Pagination } from '../interfaces/pagination.interface';

export class ItemsService {
    async create(newItem: inputNewItem): Promise<IItem | undefined> {
        try {
            const item = await Item.create({ ...newItem });
            return { ...item.dataValues };
        } catch (error) {
            throw new Error('id: duplicate key value violates primary key');
        }
    }

    async getAll({ limit = 10, offset = 0 }: Pagination) {
        try {
            const { count, rows } = await Item.findAndCountAll({
                limit,
                offset
            });
            return { count, items: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getAllByNIT(NIT: string, { limit = 10, offset = 0 }: Pagination) {
        try {
            const { count, rows } = await Item.findAndCountAll({
                where: {
                    NIT
                },
                order: [
                    ['itemName', 'ASC']
                ],
                limit,
                offset
            });
            return { count, items: rows }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getOne(id: string) {
        const item = await Item.findByPk(id);
        if (!item) {
            throw new Error(`${id} not found`);
        }
        return item;
    }

    async update(id: string, updatedItem: inputUpdatedItem) {
        const item = await this.getOne(id);
        return await item.update({ ...updatedItem });
    }

    async remove(id: string) {
        const item = await this.getOne(id);
        try {
            return await item.destroy();
        } catch (error) {
            throw new Error(`Company with NIT:${id} cannot be removed in the database`)
        }
    }

}