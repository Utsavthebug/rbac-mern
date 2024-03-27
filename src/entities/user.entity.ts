import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'users'})
export class User extends Base{
    
    @PrimaryGeneratedColumn()
    user_id:number

    @Column({nullable:false})
    name:string;

    @Column({nullable:false,unique:true})
    email:string;

    @Column({nullable:false,select:false})
    password:string;

    }
