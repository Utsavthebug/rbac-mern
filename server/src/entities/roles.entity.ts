import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column({
        type:'varchar',
        nullable:true,
    })
    description:string;

    @OneToMany(()=>User,(user)=>user.role)
    user:User[]

    @OneToMany(()=>FeaturesToRoles,featureToRoles=>featureToRoles.role)
    public featuretoroles:FeaturesToRoles[]

    @BeforeInsert()
    @BeforeUpdate()
    transformToLowercase() {
        if (this.role_name) {
            this.role_name = this.role_name.toLowerCase();
        }
    }
    }
