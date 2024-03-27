import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity({name:'users'})
export class User extends Base{
    @Column({nullable:false})
    first_name:string;
    
    @Column({nullable:false})
    last_name:string;

    @Column({nullable:false,unique:true})
    email:string;

    @Column({nullable:false,select:false})
    password:string;

    }
