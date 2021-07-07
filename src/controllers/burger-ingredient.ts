import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { getConnection, InsertResult } from 'typeorm';
import { BurgerIngredient } from '../../entity/burger-ingredient/index';

const NAMESPACE = 'Burger Ingredient';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando todos ingredientes.');
    try {
        const results = await getConnection().getRepository(BurgerIngredient).find();

        logging.info(NAMESPACE, 'Retornando ingredientes: ', results);

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
    logging.info(NAMESPACE, 'Inserindo ingrediente');
    const { name, value, type } = req.body;
    try {
        const ingredient: BurgerIngredient = new BurgerIngredient({ name, value: Number(value), type });
        const result = await getConnection().createQueryBuilder().insert().into(BurgerIngredient).values(ingredient).returning(['name']).execute();

        logging.info(NAMESPACE, 'ingrediente criado: ', result);

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
    logging.info(NAMESPACE, 'Atualizando ingrediente.');
    const { id, name, value, type } = req.body;
    try {
        const ingredient: Partial<BurgerIngredient> = {
            id: Number(id),
            name,
            value: Number(value),
            type
        };
        const results = await getConnection().getRepository(BurgerIngredient).save(ingredient);

        logging.info(NAMESPACE, 'ingrediente atualizado: ', results);

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
    logging.info(NAMESPACE, 'Excluindo ingrediente.');
    const { id } = req.params;
    try {
        const results = await getConnection()
            .getRepository(BurgerIngredient)
            .delete({ id: Number(id) });
        logging.info(NAMESPACE, 'ingrediente excluído: ', results);

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

export default { getAll, create, updateById, deleteById };
