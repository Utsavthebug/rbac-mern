import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const authorization = (...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({
            where:{
                id: parseInt(req['currentUser'].id)
            }
        })
        if(true){
            next()
        }
        else{
         return res.status(403).json({ message: "Forbidden" });
        }
       }
}