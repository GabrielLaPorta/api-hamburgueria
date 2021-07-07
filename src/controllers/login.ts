import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { getConnection } from 'typeorm';
import { Users } from '../../entity/users/index';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'Login';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Logando usuário.');
    try {
        const user = await getConnection()
            .getRepository(Users)
            .findOne({
                where: {
                    email: req.body.email
                }
            });
        if (user) {
            if (user.checkIfPasswordMatch(req.body.password)) {
                const token = jwt.sign(
                    {
                        userId: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role
                    },
                    config.server.jwtKey,
                    {
                        expiresIn: '10h'
                    }
                );
                return res.status(200).json({
                    message: 'autenticado',
                    token: token
                });
            } else {
                return res.status(401).send({ message: 'Falha na autenticação' });
            }
        } else {
            return res.status(401).send({ message: 'Falha na autenticação' });
        }
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

export default { authenticate };
