import * as express from 'express';

const router = express.Router()

router.get('/',(req:express.Request,res:express.Response)=>{
    res.status(200).send('hello world')
})

export {router as rootRouter}

