import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { getConnection, InsertResult } from 'typeorm';
import { BurgerIngredient } from '../../entity/burger-ingredient/index';

const NAMESPACE = 'Burger Ingredient';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando todos ingredientes.');
    try {
        const results = req.query.searchTerm
            ? await getConnection()
                  .getRepository(BurgerIngredient)
                  .createQueryBuilder('ing')
                  .where('LOWER(ing.name) like LOWER(:name)', { name: `%${req.query.searchTerm}%` })
                  .getMany()
            : await getConnection().getRepository(BurgerIngredient).find();

        logging.info(NAMESPACE, 'Retornando ingredientes: ', results);

        const bread: any[] = [];
        const salad: any[] = [];
        const beef: any[] = [];
        const sauce: any[] = [];
        const cheese: any[] = [];

        results.map((ing) => {
            switch (ing.type) {
                case 'bread':
                    bread.push(ing);
                    break;
                case 'salad':
                    salad.push(ing);
                    break;
                case 'beef':
                    beef.push(ing);
                    break;
                case 'sauce':
                    sauce.push(ing);
                    break;
                case 'cheese':
                    cheese.push(ing);
                    break;
            }
        });

        return res.status(200).json({
            bread,
            salad,
            beef,
            sauce,
            cheese
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
