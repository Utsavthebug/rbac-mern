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
        let feature_roles_array = []
        if(featuretoroles.length>0){
            for (const featurerole of featuretoroles){
                //getting feature from feature_id 
                const feature = await RoleController.featureRepository.findOne({where:{
                    feature_id:featurerole.feature_id
                }})

                const featuretoRolesInstance = new FeaturesToRoles()
                featuretoRolesInstance.feature_access = featurerole.feature_access
                if(feature) featuretoRolesInstance.feature = feature
                featuretoRolesInstance.role = newrole
                feature_roles_array.push(featuretoRolesInstance)
                await RoleController.featuretoRolesRepository.save(featuretoRolesInstance)
            }
        }

        const newroles_features = {
            role:newrole,
            roles_features:feature_roles_array
        }

        return res.status(StatusCodes.CREATED).json({message:"New Role Succesfully Created",data:newroles_features})
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