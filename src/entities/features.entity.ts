import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'features'})
export class Features{
    @PrimaryGeneratedColumn()
    feature_id:number

    @Column({nullable:false})
    feature_name:string;
    
    //if it is active for all clients 
    @Column({default:false})
    active:boolean;
    
    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    }
