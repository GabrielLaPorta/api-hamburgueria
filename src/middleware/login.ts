import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers.authorization?.split(' ')[1];
        const decode: any = jwt.verify(token, config.server.jwtKey);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).send({
            message: 'Falha na autenticação'
        });
    }
};
