import * as express from 'express';
import { ErrorWrapper } from '../hoc/ErrorWrapper';
import { UserController } from '../controllers/user.controller';
const router = express.Router()

router.route('/').get(ErrorWrapper(UserController.getAll))
router.route('/:id')
.delete(ErrorWrapper(UserController.delete))
.patch(UserController.update)

export {router as usersRouter}