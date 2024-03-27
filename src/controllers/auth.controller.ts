import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { encrypt } from "../helpers/helpers";
import { StatusCodes } from "http-status-codes";


export class AuthController{
    private static readonly userRepository = AppDataSource.getRepository(User)

    public static async login(req:Request,res:Response){
        const {email,password} = req.body

        const user = await AuthController.userRepository.createQueryBuilder('user')
        .where("user.email = :email",{email})
        .addSelect('user.password')
        .getOne()

        if(!user){
           return res.status(StatusCodes.NOT_FOUND).json({message:"User not found"})
        }
        //comparing password
        const isPasswordValid =await encrypt.comparepassword(user.password,password)
        if(!isPasswordValid){
           return res.status(StatusCodes.NOT_FOUND).json({message:"Invalid Credentials"})
        }

        const {password:discardPassword,...rest} = user

        const token = encrypt.generateToken({id:user.user_id})
        
        return res.status(StatusCodes.OK).json({message:"Login Succesful",token,user:rest})
    }

    public static async register(req:Request,res:Response){
        const {first_name,last_name,email,password} = req.body

        //get user
        const hasUser = await AuthController.userRepository.findOne({
            where:{
                email:email
            }
        })
        if(hasUser){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Email is already used"})
        }

        //hash password
        const hashedPassword =await encrypt.encryptpass(password)

        const user = new User()
        user.first_name=first_name
        user.last_name=last_name
        user.password=hashedPassword
        user.email=email

        //getting respository
        await AuthController.userRepository.save(user)

        //generating token 
        const token = encrypt.generateToken({id:user.user_id})

        res.status(StatusCodes.CREATED).json({message:"User Created Succesfully",token,user})
    }

    public static async changePassword(req:Request,res:Response){
        const {oldpassword,newpassword} = req.body;
        const userId = req["currentUser"].id
        
        const user = await AuthController.userRepository.findOne({
            where:{
                user_id: parseInt(userId)
            }
        })

        if(!user){
           return res.status(StatusCodes.NOT_FOUND).json({})
        }

        //checking password
        const isPasswordValid = encrypt.comparepassword(user.password,oldpassword)
        
        if(!isPasswordValid){
        return res.status(StatusCodes.BAD_REQUEST).json({message:"Incorrect Old Password"})
        }
        
        const encryptPassword = await encrypt.encryptpass(newpassword)
        user.password = encryptPassword;

        await AuthController.userRepository.save(user)

        return res.status(StatusCodes.CREATED).json({message:"Password changed Succesfully"})
   
    }

}