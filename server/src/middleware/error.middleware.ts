import { NextFunction, Request, Response } from "express";

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
}