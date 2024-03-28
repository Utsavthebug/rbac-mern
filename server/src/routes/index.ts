import * as express from 'express';
import { authRouter } from './auth.route';
import { roleRouter } from './roles.route';

const router = express.Router()

router.use('/auth',authRouter)
router.use('/role',roleRouter)

export {router as rootRouter}

