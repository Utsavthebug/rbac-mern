import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { FeaturesToRoles } from "./featuretoroles.entity";

@Entity({name:'roles'})
export class Roles{
    @PrimaryGeneratedColumn()
    role_id:number

    @Column({nullable:false,unique:true})
    role_name:string;
    
    @CreateDateColumn()
    created_at:Date;

    @OneToMany(()=>User,(user)=>user.role)
    user:User[]

    @OneToMany(()=>FeaturesToRoles,featureToRoles=>featureToRoles.role)
    public featuretoroles:FeaturesToRoles[]

    }
