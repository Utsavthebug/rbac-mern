import * as express from 'express';
import { authRouter } from './auth.route';
import { roleRouter } from './roles.route';
import { featureRouter } from './feature.route';
import { featuretorolesRouter } from './featuretoroles.route';

const router = express.Router()

router.use('/auth',authRouter)
router.use('/role',roleRouter)
router.use('/feature',featureRouter)
router.use('/featurerole',featuretorolesRouter)

export {router as rootRouter}

