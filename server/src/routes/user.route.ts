import * as express from 'express';
import { ErrorWrapper } from '../hoc/ErrorWrapper';
import { UserController } from '../controllers/user.controller';
import { authentication } from '../middleware/auth.middleware';
const router = express.Router()

router.route('/').get(ErrorWrapper(UserController.getAll))
router.route('/:id')
.delete(ErrorWrapper(UserController.delete))
.patch(UserController.update)
router.get('/me',authentication,ErrorWrapper(UserController.fetchMe))

export {router as usersRouter}