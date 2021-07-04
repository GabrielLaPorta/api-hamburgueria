import express from 'express';
import user from '../controllers/user';

const router = express.Router();

router.get('/user/:id', user.getById);
router.get('/users', user.getAll);
router.post('/user', user.create);
router.put('/user', user.updateById);
router.delete('/user', user.deleteById);

export = router;
