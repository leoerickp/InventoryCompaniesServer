import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidUserType } from "../enums/ValidUsers.enum";

export const validAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    if (user.userType !== ValidUserType.admin) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'User cannot access this resource',
        });
    }
    next();
}