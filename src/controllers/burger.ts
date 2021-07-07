import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { getConnection, InsertResult } from 'typeorm';
import { BurgerIngredient } from '../../entity/burger-ingredient/index';
import { Burger } from '../../entity/burger';
import { BurgerPieces } from '../../entity/burger-pieces';
import { Users } from '../../entity/users';

const NAMESPACE = 'Burger';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Buscando todos hamburguers.');
    try {
        const results = await getConnection()
            .getRepository(Burger)
            .find({
                where: {
                    user: {
                        id: req.user.userId
                    }
                },
                relations: ['user', 'pieces']
            });

        logging.info(NAMESPACE, 'Retornando burgers do usuário: ', results);

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
    logging.info(NAMESPACE, 'Inserindo burger');
    const { name, value, ingredients } = req.body;
    try {
        const burger: Burger = await new Burger({ name, value, userId: Number(req.user.userId) }).save();

        const pieces: BurgerPieces[] = ingredients.forEach(
            async (ingredient: BurgerIngredient) =>
                await new BurgerPieces({
                    ingredientId: ingredient.id,
                    burgerId: burger.id,
                    value: ingredient.value
                }).save()
        );

        await getConnection().createQueryBuilder().insert().into(BurgerPieces).values(pieces).returning(['id']).execute();

        logging.info(NAMESPACE, 'ingrediente criado: ', burger);

        return res.status(200).json({
            burger
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
    logging.info(NAMESPACE, 'Atualizando burger.');
    const { id, name, value, ingredients } = req.body;
    try {
        const burger = await Burger.findOne({ where: { id: id, user: { id: req.user.userId } }, relations: ['pieces', 'user'] });
        if (burger) {
            const pieces: BurgerPieces[] = ingredients.map(
                (ingredient: BurgerIngredient) =>
                    new BurgerPieces({
                        ingredientId: ingredient.id,
                        burgerId: burger.id,
                        value: ingredient.value
                    })
            );
            burger.name = name;
            burger.value = value;
            burger.pieces = pieces;
            await burger.save();

            logging.info(NAMESPACE, 'burger atualizado: ', burger);

            return res.status(200).json({
                burger
            });
        } else {
            throw 'este hambúrguer não existe';
        }
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Excluindo burger.');
    const { id } = req.params;
    try {
        const results = await getConnection()
            .getRepository(Burger)
            .delete({ id: Number(id) });
        logging.info(NAMESPACE, 'burger excluído: ', results);

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
