import express from 'express';
import burger from '../controllers/burger';
import auth from '../middleware/login';

const router = express.Router();

router.get('/burger', auth, burger.getAll);
router.post('/burger', auth, burger.create);
router.put('/burger', auth, burger.updateById);
router.delete('/burger/:id', auth, burger.deleteById);

export = router;
