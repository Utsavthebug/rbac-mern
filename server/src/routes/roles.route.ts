import * as express from 'express';
import { ErrorWrapper } from '../hoc/ErrorWrapper';
const router = express.Router()
import { RoleController } from '../controllers/role.controller';

router.post('/create',ErrorWrapper(RoleController.create))
router.get('/',ErrorWrapper(RoleController.getAll))
router.route('/:roleId').delete(ErrorWrapper(RoleController.delete)).get(ErrorWrapper(RoleController.getOne))

export {router as roleRouter}