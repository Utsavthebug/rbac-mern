import * as express from 'express';
import { ErrorWrapper } from '../hoc/ErrorWrapper';
import { FeatureToRolesController } from '../controllers/featuretoroles.controller';
const router = express.Router()


router.route('/').post(ErrorWrapper(FeatureToRolesController.create))

export {router as featuretorolesRouter}