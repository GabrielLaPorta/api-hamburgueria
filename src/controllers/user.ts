import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { getConnection, InsertResult } from 'typeorm';
import { Users } from '../../entity/users/index';

const NAMESPACE = 'Users';

const getById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando usuário.');
    try {
        const results = await getConnection().getRepository(Users).findByIds([req.params.id]);
        logging.info(NAMESPACE, 'Retornando usuário: ', results);

        return res.status(200).json({
            results
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando todos usuários.');
    try {
        const results = await getConnection().getRepository(Users).find();

        logging.info(NAMESPACE, 'Retornando usuários: ', results);

        return res.status(200).json({
            results
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserindo usuário');
    const { name, username, email, password, cpf } = req.body;
    try {
        const user: Users = new Users({ name, username, email, password, cpf });
        user.hashPassword();
        const result = await getConnection().createQueryBuilder().insert().into(Users).values(user).returning(['name']).execute();

        logging.info(NAMESPACE, 'Usuário criado: ', result);

        return res.status(200).json({
            result
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Atualizando usuário.');
    const { id, name, username, email, password, cpf } = req.body;
    try {
        const user: Partial<Users> = {
            id: Number(id),
            name,
            username,
            email,
            password,
            cpf
        };
        const results = await getConnection().getRepository(Users).save(user);

        logging.info(NAMESPACE, 'Usuário atualizado: ', results);

        return res.status(200).json({
            results
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Excluindo usuário.');
    const { id } = req.params;
    try {
        const results = await getConnection()
            .getRepository(Users)
            .softDelete({ id: Number(id) });
        logging.info(NAMESPACE, 'Usuário excluído: ', results);

        return res.status(200).json({
            results
        });
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

export default { getById, getAll, create, updateById, deleteById };
