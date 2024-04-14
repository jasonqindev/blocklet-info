import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
const { find, findById, create, update, delete: del } = require('../controller/users');

const router = Router();

router.get('/users', find);

router.post('/users', create);

router.get('/users/:id', findById);

router.put('/users/:id', middleware.user(), update);

router.delete('/users/:id', middleware.user(), del);

export default router;
