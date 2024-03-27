import * as express from 'express';
import { ErrorWrapper } from '../hoc/ErrorWrapper';
const router = express.Router()
import { AuthController } from '../controllers/auth.controller';

router.post('/login',ErrorWrapper(AuthController.login))
router.post('/register',ErrorWrapper(AuthController.register))
router.post('/changepassword',ErrorWrapper(AuthController.changePassword))

export {router as authRouter}