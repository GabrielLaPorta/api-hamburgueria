import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { getConnection, InsertResult } from 'typeorm';
import { User } from '../../entity/User';

const NAMESPACE = 'Users';

const getById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando usuário.');
    await getConnection()
        .getRepository(User)
        .findByIds([req.params.id])
        .then((results) => {
            logging.info(NAMESPACE, 'Retornando usuário: ', results);

            return res.status(200).json({
                results
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando todos usuários.');
    await getConnection()
        .getRepository(User)
        .find()
        .then((results) => {
            logging.info(NAMESPACE, 'Retornando usuários: ', results);

            return res.status(200).json({
                results
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserindo usuário');
    const { name, username, email, password, cpf } = req.body;
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            name: name,
            email: email,
            username: username,
            password: password,
            cpf: cpf
        })
        .returning(['name'])
        .execute()
        .then((result: InsertResult) => {
            logging.info(NAMESPACE, 'Usuário criado: ', result);

            return res.status(200).json({
                result
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Atualizando usuário.');
    const { id, name, username, email, password, cpf } = req.body;
    const user: Partial<User> = {
        id,
        name,
        username,
        email,
        password,
        cpf
    };
    await getConnection()
        .getRepository(User)
        .save(user)
        .then((results) => {
            logging.info(NAMESPACE, 'Usuário atualizado: ', results);

            return res.status(200).json({
                results
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Excluindo usuário.');
    const { id } = req.body;

    await getConnection()
        .getRepository(User)
        .softDelete({ id: id })
        .then((results) => {
            logging.info(NAMESPACE, 'Usuário excluído: ', results);

            return res.status(200).json({
                results
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { getById, getAll, create, updateById, deleteById };
