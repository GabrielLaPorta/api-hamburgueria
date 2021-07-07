import express from 'express';
import user from '../controllers/user';
import auth from '../middleware/login';

const router = express.Router();

router.get('/user/:id', user.getById);
router.get('/users', user.getAll);
router.post('/user', user.create);
router.put('/user', auth, user.updateById);
router.delete('/user/:id', auth, user.deleteById);

export = router;
