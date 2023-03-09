import { Router } from "express";
import { check } from "express-validator";
import { CompaniesController } from "../controllers";
import { ValidFields, validateJWT, validAdminUser } from "../middlewares";

const companiesController = new CompaniesController();
export const companiesRoutes: Router = Router();

companiesRoutes.get('/', [
    validateJWT,
    check('limit', 'limit must be a number').optional().isNumeric(),
    check('limit', 'limit must be a positive over than 1').optional().isInt({ min: 1 }),
    check('offset', 'offset must be a number').optional().isNumeric(),
    check('offset', 'offset must be a positive over than 0').optional().isInt({ min: 0 }),
    ValidFields
], companiesController.getAll);



companiesRoutes.get('/:NIT', [
    validateJWT,
    check('NIT', 'NIT is required').not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').isLength({ min: 3, max: 20 }),
    ValidFields
], companiesController.getOneByNIT);

companiesRoutes.post('/', [
    validateJWT,
    validAdminUser,
    check('NIT', 'NIT is required').not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').isLength({ min: 3, max: 20 }),
    check('companyName', 'companyName is required').not().isEmpty(),
    check('companyName', 'companyName: length must be between 2 and 100 characters').isLength({ min: 2, max: 100 }),
    check('address', 'address is required').not().isEmpty(),
    check('address', 'address must be have until 255 characters').isLength({ max: 255 }),
    check('phone', 'phone must be a valid phone number').optional().isLength({ min: 7 }),
    ValidFields
], companiesController.create);

companiesRoutes.put('/:NIT', [
    validateJWT,
    validAdminUser,
    check('NIT', 'NIT is required').not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').isLength({ min: 3, max: 20 }),
    check('companyName', 'companyName is required').optional().not().isEmpty(),
    check('companyName', 'companyName: length must be between 2 and 100 characters').optional().isLength({ min: 2, max: 100 }),
    check('address', 'address is required').optional().not().isEmpty(),
    check('address', 'address must be have until 255 characters').optional().isLength({ max: 255 }),
    check('phone', 'phone must be a valid phone number').optional().isLength({ min: 7 }),
    ValidFields
], companiesController.update);

companiesRoutes.delete('/:NIT', [
    validateJWT,
    validAdminUser,
    check('NIT', 'NIT is required').not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').isLength({ min: 3, max: 20 }),
    ValidFields
], companiesController.remove);