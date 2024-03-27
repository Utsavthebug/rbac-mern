import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Base } from "./base.entity";
import { FEATURE_ACCESS } from "../types/access.type";
import { Features } from "./features.entity";
import { Roles } from "./roles.entity";


@Entity({name:'features_roles'})
export class FeaturesToRoles extends Base{

    @Column()
    public featureId:number;
    
    @CreateDateColumn()
    public roleId:number;

    @Column({
        type:"enum",
        enum:FEATURE_ACCESS,
        default:FEATURE_ACCESS.NONE
    })
    feature_access:FEATURE_ACCESS

    @ManyToOne(()=>Features,(feature)=>feature.featuretoroles)
    public feature:Features

    @ManyToOne(()=>Roles,(role)=>role.featuretoroles)
    public role:Roles
    }
