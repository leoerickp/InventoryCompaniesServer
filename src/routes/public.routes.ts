import { Router } from 'express';
import { PublicController } from '../controllers';

const publicController = new PublicController();

export const publicRoutes: Router = Router();
publicRoutes.get('/*', publicController.sendErrorPage);