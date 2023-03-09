import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CompaniesService, ItemsService, SeedService, UsersService } from "../services";

const usersService = new UsersService();
const companiesService = new CompaniesService();
const itemsService = new ItemsService();
const seedService = new SeedService(usersService, companiesService, itemsService);
export class SeedController {
    async createSeed(req: Request, res: Response) {
        try {
            await seedService.createSeed()
            res.json('Seed successfully!!');
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}