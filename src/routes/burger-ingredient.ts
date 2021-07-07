import express from 'express';
import user from '../controllers/user';
import auth from '../middleware/login';

const router = express.Router();

router.get('/burger-ingredients', user.getAll);
router.post('/burger-ingredient', auth, user.create);
router.put('/burger-ingredient', auth, user.updateById);
router.delete('/burger-ingredient/:id', auth, user.deleteById);

export = router;
