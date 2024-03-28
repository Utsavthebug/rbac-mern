import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StatusCodes } from "http-status-codes";
import { Roles } from "../entities/roles.entity";

export class RoleController{
    private static readonly roleRepository = AppDataSource.getRepository(Roles)

    public static async getAll(req:Request,res:Response){

       //searching filtering and pagination
       let options = {}

       if(req.query.search){
        options = {
            ...options,
            where:{
                $or:[
                    {role_name: new RegExp(req.query.search.toString(),'i')}
                ]
            }
        }
       }

       //getting all roles including features 
        const allroles = await RoleController.roleRepository.find({
        relations:{
            featuretoroles:true
        },
        ...options
       })

     return  res.status(StatusCodes.OK).json({data:allroles})
    }

    public static async create(req:Request,res:Response){
        const {role_name} = req.body

        const roleInstance = new Roles()
        roleInstance.role_name = role_name.toLowerCase()

        const newrole = await RoleController.roleRepository.save(roleInstance)

        return res.status(StatusCodes.CREATED).json({message:"New Role Succesfully Created",data:newrole})
    }

 
    public static async delete(req:Request,res:Response){
      const {roleId} = req.params

      //getting role from role_id 
      await RoleController.roleRepository
      .createQueryBuilder()
      .delete()
      .where("role_id = :roleId",{roleId})
      .execute();

      return res.status(StatusCodes.OK).json({message:"role deleted Succesfully"})
    }

    
    public static async getOne(req:Request,res:Response){
        const {roleId} = req.params
  
        //getting role from role_id 
        const role = await RoleController.roleRepository.findOne({
            where:{
                role_id: parseInt(roleId)
            }
        })

        return res.status(StatusCodes.OK).json({data:role})
      }
  



}