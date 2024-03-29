import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StatusCodes } from "http-status-codes";
import { Features } from "../entities/features.entity";
import { FeaturesToRoles } from "../entities/featuretoroles.entity";
import { Roles } from "../entities/roles.entity";
import { In } from "typeorm";


export class FeatureToRolesController{
    private static readonly featureToRolesRepository = AppDataSource.getRepository(FeaturesToRoles)
    private static readonly roleRepository = AppDataSource.getRepository(Roles)
    private static readonly featureRepository = AppDataSource.getRepository(Features)


    public static async create(req:Request,res:Response){
        const {role_features} = req.body
        
        //upserting 
       const created = await FeatureToRolesController.featureToRolesRepository.upsert([
            ...role_features
        ],['roleId','featureId'])

        //getting array of ids 
        const Ids = created.identifiers.map((identifier)=>identifier.id)

        const allfeaturetoroles = await FeatureToRolesController.featureToRolesRepository.find({
            where:{
                id:In(Ids)
            }
        })

      
         return res.status(StatusCodes.CREATED).json({message:"Created Succesfully",data:allfeaturetoroles})            

    }

 
    public static async delete(req:Request,res:Response){
      //getting id from params 
      const {featureroleId} = req.params

      await FeatureToRolesController.featureToRolesRepository
      .createQueryBuilder()
      .delete()
      .where("id = :featureroleId",{featureroleId})
      .execute()

      return res.status(StatusCodes.OK).json({message:"Deleted Succesfully"})
    }

    public static async  updateOne(req:Request,res:Response){
      const {featureroleId} = req.params
      const {feature_access} = req.body

      //getting instance
       const featuretoroleInstance = await FeatureToRolesController.featureToRolesRepository.findOne({
        where:{
            id: parseInt(featureroleId)
        }
       })

       if(!featuretoroleInstance){
        return res.status(StatusCodes.NOT_FOUND).json({message:"Invalid Id"})
       }

       if(feature_access) featuretoroleInstance.feature_access = feature_access

       const updated = await FeatureToRolesController.featureToRolesRepository.save(featuretoroleInstance)

       return res.status(StatusCodes.OK).json({message:"Updated Succesfully",data:updated})
    }
  



}