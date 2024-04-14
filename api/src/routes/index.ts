import { Router } from 'express';

import { find, findById, create, update, deleteUser } from '../controller/users';

const router = Router();

router.get('/users', find);

router.post('/users', create);

router.get('/users/:id', findById);

router.put('/users/:id', update);

router.delete('/users/:id', deleteUser);

export default router;
