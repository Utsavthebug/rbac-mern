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
            //getting roles Instance 
            const created_role = await RoleController.roleRepository.findOne({
                where:{
                    role_id:newrole.role_id
                }
            })

            const newmappeddata = await Promise.all(featuretoroles.map(async(featurerole:any)=>{
                //fetching feature 
                const featureInstance = await RoleController.featureRepository.findOne({
                    where:{
                        feature_id:featurerole.featureId
                    }
                })
                const FeatureRole = new FeaturesToRoles()
                FeatureRole.featureId = featurerole.featureId
                FeatureRole.roleId = newrole.role_id
                if(featureInstance) FeatureRole.feature = featureInstance
                FeatureRole.feature_access = featurerole.feature_access

                const feature_role_created = await RoleController.featuretoRolesRepository.save(FeatureRole)
                return feature_role_created
                
            }))
                
        if(created_role) created_role.featuretoroles = newmappeddata 
        created_role && await RoleController.roleRepository.save(created_role)     
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

        //feature roles 
        if(feature_roles && feature_roles.length>0){
        const filtered_feature_roles = feature_roles
        .filter((featurerole:any)=>!!featurerole.id)
    

        filtered_feature_roles.length>0 && await RoleController.featuretoRolesRepository.save([...filtered_feature_roles])

        const new_feature_roles = feature_roles
        .filter((featurerole:any)=>!featurerole.id)

        let feature_role_instances = []

        for(const featurerole of new_feature_roles){
            const featureroleInstance = new FeaturesToRoles()
            featureroleInstance.roleId = parseInt(roleId)
            featureroleInstance.featureId = featurerole.featureId
            if(featurerole.feature_access) featureroleInstance.feature_access = featurerole.feature_access
            feature_role_instances.push(featureroleInstance)
        }

        //saving all instances       
        feature_role_instances.length > 0 && await RoleController.featuretoRolesRepository.save([...feature_role_instances])

        const rolewithfeatures = await RoleController.roleRepository.findOne(
            {
                relations:{
                    featuretoroles:true
                },
                where:{
                 role_id: parseInt(roleId)   
                }
            }
        )
           
        return res.status(StatusCodes.CREATED).json({message:"New Role Succesfully Created",data:rolewithfeatures})

       }
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