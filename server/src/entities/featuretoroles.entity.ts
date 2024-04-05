import { Column, CreateDateColumn, Entity, ManyToOne, Unique } from "typeorm";
import { Base } from "./base.entity";
import { FEATURE_ACCESS } from "../types/access.type";
import { Features } from "./features.entity";
import { Roles } from "./roles.entity";


@Entity({name:'features_roles'})
 @Unique('feature_role_unique_constraint',['featureId','roleId'])
export class FeaturesToRoles extends Base{
    @Column()
    public featureId:number;
    
    @Column()
    public roleId:number;

    @Column({
        type:"enum",
        enum:FEATURE_ACCESS,
        default:FEATURE_ACCESS.NONE
    })
    feature_access:FEATURE_ACCESS

    @ManyToOne(()=>Features,(feature)=>feature.featuretoroles,{onDelete:'CASCADE'})
    public feature:Features

    @ManyToOne(()=>Roles,(role)=>role.featuretoroles,{onDelete:'CASCADE'})
    public role:Roles
    }
