import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StatusCodes } from "http-status-codes";
import { Roles } from "../entities/roles.entity";
import { User } from "../entities/user.entity";
import { ILike } from "typeorm";


export class UserController{
    private static readonly userRepository = AppDataSource.getRepository(User)
    private static readonly roleRepository = AppDataSource.getRepository(Roles)


    public static async getAll(req:Request,res:Response){

       //searching filtering and pagination
       let options = {}

       if(req.query.search){
        options = {
            ...options,
            where:[
                    {first_name: ILike(`%${req.query.search.toString()}%`)},
                    {last_name: ILike(`%${req.query.search.toString()}%`)},
                    {email: ILike(`%${req.query.search.toString()}%`)}
                ]
            }
        }
    
       //get all users 
       const [allusers,totalCount] = await UserController.userRepository.findAndCount({
        relations:{
        role:{
           featuretoroles:true
        }
        },
        ...options
       })

    
       return res.status(StatusCodes.OK).json({data:allusers})
       
    }

    public static async delete(req:Request,res:Response){
        const {id} = req.params

        //getting role from role_id 
        await UserController.userRepository
        .createQueryBuilder()
        .delete()
        .where("id = :id",{id})
        .execute();
  
        return res.status(StatusCodes.OK).json({message:"User deleted Succesfully",id})
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

         return res.status(StatusCodes.OK).json({message:"User Updated Succesfully",data:updated_user})

       }

    public static async fetchMe(req:Request,res:Response){
        const userId = req["currentUser"].id
        //fetching user info
        const userdata = await UserController.userRepository.findOne({
            relations:{
                role:true
            },
            where:{
                id:parseInt(userId)
            }
        })

        return res.status(StatusCodes.OK).json({data:userdata})
    }
  
  
}