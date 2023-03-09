import { Router } from 'express';
import { SeedController } from '../controllers';

const seedController = new SeedController();
export const seedRoutes: Router = Router();

seedRoutes.get('/', seedController.createSeed);