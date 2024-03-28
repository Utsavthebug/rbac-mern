import * as express from 'express';
import { ErrorWrapper } from '../hoc/ErrorWrapper';
const router = express.Router()
import { FeatureController } from '../controllers/feature.controller';

router.route('/')
.get(ErrorWrapper(FeatureController.getAll))
.post(ErrorWrapper(FeatureController.create))

router.route('/:featureId')
.patch(ErrorWrapper(FeatureController.updateOne))
.delete(ErrorWrapper(FeatureController.delete))
.get(ErrorWrapper(FeatureController.getOne))


export {router as authRouter}