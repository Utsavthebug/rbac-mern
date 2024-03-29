import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StatusCodes } from "http-status-codes";
import { Roles } from "../entities/roles.entity";
import { FeaturesToRoles } from "../entities/featuretoroles.entity";
import { Features } from "../entities/features.entity";

export class RoleController{
    private static readonly roleRepository = AppDataSource.getRepository(Roles)
    private static readonly featuretoRolesRepository = AppDataSource.getRepository(FeaturesToRoles)
    private static readonly featureRepository = AppDataSource.getRepository(Features)

    public static async getrolebyId(id:number){
        const role = await RoleController.roleRepository.findOne(
          { where:{
                role_id:id
            }
        }
        )
        return role
    }

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
        const {role_name,featuretoroles} = req.body

        const roleInstance = new Roles()
        roleInstance.role_name = role_name

        const newrole = await RoleController.roleRepository.save(roleInstance)

        //adding feature to roles 
        if(featuretoroles && featuretoroles.length>0){
            const newmappeddata = featuretoroles.map((featurerole:any)=>{
                return {
                    featureId:featurerole.feature_id,
                    roleId:newrole.role_id,
                    feature_access:featurerole.feature_access
                }
            })
         await RoleController.featuretoRolesRepository.insert(newmappeddata)       
    }

    const rolewithfeatures = await RoleController.roleRepository.findOne(
        {
            relations:{
                featuretoroles:true
            },
            where:{
             role_id:newrole.role_id   
            }
        }
    )
       
    return res.status(StatusCodes.CREATED).json({message:"New Role Succesfully Created",data:rolewithfeatures})
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

    public static async update(req:Request,res:Response){
        const {roleId} = req.params
        const {role_name,description,feature_roles} = req.body

        const role = await RoleController.getrolebyId(parseInt(roleId))

        if(!role){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Invalid role Id"})
        }

        if(role_name) role.role_name = role_name
        if(description) role.description = description
        await RoleController.roleRepository.save(role)

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