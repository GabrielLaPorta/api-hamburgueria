import express from 'express';
import burgerIngredient from '../controllers/burger-ingredient';
import auth from '../middleware/login';

const router = express.Router();

router.get('/burger-ingredients', burgerIngredient.getAll);
router.post('/burger-ingredient', auth, burgerIngredient.create);
router.put('/burger-ingredient', auth, burgerIngredient.updateById);
router.delete('/burger-ingredient/:id', auth, burgerIngredient.deleteById);

export = router;
