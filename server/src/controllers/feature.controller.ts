import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StatusCodes } from "http-status-codes";
import { Features } from "../entities/features.entity";
import { stringHelper } from "../helpers/helpers";
import { ILike } from "typeorm";


export class FeatureController{
    private static readonly featureRepository = AppDataSource.getRepository(Features)

    public static async getAll(req:Request,res:Response){

       //searching filtering and pagination
       let options = {}

       if(req.query.search || req.query.active){
        options = {
            ...options,
            where:{
              ...(req.query.search &&
                    {feature_name:  ILike(`%${req.query.search.toString()}%`)}
                 ),
            ...(req.query.active && {active: stringHelper.queryParamToBool(req.query.active as string)} )
            }
        }
       }

       //getting all roles including features 
        const allfeatures = await FeatureController.featureRepository.find({
        relations:{
            featuretoroles:true
        },
        ...options
       })

     return  res.status(StatusCodes.OK).json({data:allfeatures})
    }

    public static async create(req:Request,res:Response){
        const {feature_name,active} = req.body

        const featureInstance = new Features()
        featureInstance.feature_name = feature_name

        if(typeof active==="boolean") featureInstance.active = active;

        const newfeature = await FeatureController.featureRepository.save(featureInstance)

        return res.status(StatusCodes.CREATED).json({message:"New Role Succesfully Created",data:newfeature})
    }

 
    public static async delete(req:Request,res:Response){
      const {featureId} = req.params

      //getting role from role_id 
      await FeatureController.featureRepository
      .createQueryBuilder()
      .delete()
      .where("feature_id = :featureId",{featureId})
      .execute();

      return res.status(StatusCodes.OK).json({message:"feature deleted Succesfully"})
    }

    
    public static async getOne(req:Request,res:Response){
        const {featureId} = req.params

  
        //getting role from role_id 
        const role = await FeatureController.featureRepository.findOne({
            where:{
                feature_id: parseInt(featureId)
            }
        })

        return res.status(StatusCodes.OK).json({data:role})
      }


    public static async  updateOne(req:Request,res:Response){
        const {featureId} = req.params
        const {feature_name,active} = req.body

        //fetch single feature 
        const feature = await FeatureController.featureRepository.findOne({
            where:{
                feature_id: parseInt(featureId)
            }
        })

        if(!feature){
           return  res.status(StatusCodes.NOT_FOUND).json({message:`Feature not found`})
        }

        if(feature_name) feature.feature_name  = feature_name
        if(typeof active==="boolean") feature.active = active;

        
        const updated_feature = await FeatureController.featureRepository.save(feature)

        return res.status(StatusCodes.OK).json({message:'Feature Updated Succesfully',data:updated_feature})

    }
  



}