import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FeaturesToRoles } from "./featuretoroles.entity";

@Entity({name:'features'})
export class Features{
    @PrimaryGeneratedColumn()
    feature_id:number

    @Column({nullable:false,unique:true})
    feature_name:string;
    
    //if it is active for all clients 
    @Column({default:false})
    active:boolean;
    
    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @OneToMany(()=>FeaturesToRoles,featureToRoles=>featureToRoles.feature)
    public featuretoroles:FeaturesToRoles[]


    }
