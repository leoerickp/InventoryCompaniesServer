import { Router } from "express";
import { check } from "express-validator";
import { ItemsController } from "../controllers";
import { ValidFields, validateJWT, validAdminUser } from "../middlewares";

const itemsController = new ItemsController();
export const itemsRoutes: Router = Router();

itemsRoutes.get('/by-nit/:NIT', [
    validateJWT,
    check('NIT', 'NIT is required').not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').isString().isLength({ min: 3, max: 20 }),
    check('limit', 'limit must be a number').optional().isNumeric(),
    check('limit', 'limit must be a positive over than 1').optional().isInt({ min: 1 }),
    check('offset', 'offset must be a number').optional().isNumeric(),
    check('offset', 'offset must be a positive over than 0').optional().isInt({ min: 0 }),
    ValidFields
], itemsController.getAllByNIT);



itemsRoutes.get('/:id', [
    validateJWT,
    check('id', 'id field must be a UUID value').isUUID(4),
    ValidFields
], itemsController.getOneById);

itemsRoutes.post('/', [
    validateJWT,
    validAdminUser,
    check('itemName', 'itemName is required').not().isEmpty(),
    check('itemName', 'itemName: length must be between 2 and 100 characters').isLength({ min: 2, max: 100 }),
    check('amount', 'amount is required').not().isEmpty(),
    check('amount', 'amount must be a number').isNumeric(),
    check('amount', 'amount must be a positive over than 1').isInt({ min: 0 }),
    check('NIT', 'NIT is required').not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').isLength({ min: 3, max: 20 }),
    ValidFields
], itemsController.create);

itemsRoutes.put('/:id', [
    validateJWT,
    validAdminUser,
    check('id', 'id field must be a UUID value').isUUID(4),
    check('itemName', 'itemName is required').optional().not().isEmpty(),
    check('itemName', 'itemName: length must be between 2 and 100 characters').optional().isLength({ min: 2, max: 100 }),
    check('amount', 'amount is required').optional().not().isEmpty(),
    check('amount', 'amount must be a number').optional().isNumeric(),
    check('amount', 'amount must be a positive over than 1').optional().isInt({ min: 0 }),
    check('NIT', 'NIT is required').optional().not().isEmpty(),
    check('NIT', 'NIT length must be between 3 and 20 characters').optional().isLength({ min: 3, max: 20 }),
    ValidFields
], itemsController.update);

itemsRoutes.delete('/:id', [
    validateJWT,
    validAdminUser,
    check('id', 'id field must be a UUID value').isUUID(4),
    ValidFields
], itemsController.remove);