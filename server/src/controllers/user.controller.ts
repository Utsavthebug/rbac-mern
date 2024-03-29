import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StatusCodes } from "http-status-codes";
import { Roles } from "../entities/roles.entity";
import { User } from "../entities/user.entity";

export class UserController{
    private static readonly userRepository = AppDataSource.getRepository(User)
    private static readonly roleRepository = AppDataSource.getRepository(Roles)


    public static async getAll(req:Request,res:Response){

       //searching filtering and pagination
       let options = {}


       const page = parseInt(req.query.page as string) || 1
       const limit = parseInt(req.query.limit as string) || 10

       const take = limit
       const skip = (page-1) * take

       options = {
        ...options,
        take,
        skip
       }

       if(req.query.search){
        options = {
            ...options,
            where:{
                $or:[
                    {first_name: new RegExp(req.query.search.toString(),'i')},
                    {last_name: new RegExp(req.query.search.toString(),'i')},
                    {email: new RegExp(req.query.search.toString(),'i')}
                ]
            }
        }
       }

       //get all users 
       const [allusers,totalCount] = await UserController.userRepository.findAndCount({
        relations:{
        role:{
           featuretoroles:true
        }
        },    
       })

       const pagination = {
        currentPage:page,
        limit,
        skip,
        totalCount
       }

       return res.status(StatusCodes.OK).json({data:allusers,pagination})
       
    }

    public static async delete(req:Request,res:Response){
        const {id} = req.params

        //getting role from role_id 
        await UserController.userRepository
        .createQueryBuilder()
        .delete()
        .where("id = :id",{id})
        .execute();
  
        return res.status(StatusCodes.OK).json({message:"User deleted Succesfully"})
    }

    public static async update(req:Request,res:Response){
        const {id} = req.params
        const {roleId} = req.body

        //getting roles 
        const roleInstance = await UserController.roleRepository.findOne({
            where:{
                role_id:roleId
            }
        })

        if(!roleInstance){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Invalid Role"})
        }

        const userInstance = await UserController.userRepository.findOne({
            where:{
                id:parseInt(id)
            }
        })

        if(!userInstance){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Invalid User Id"})
        }

         userInstance.role = roleInstance

         const updated_user = await UserController.userRepository.save(userInstance)

         return res.status(StatusCodes.OK).json({message:"User Updated Succesfully"})

       }
  
  
}