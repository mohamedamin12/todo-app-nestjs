import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  title: string;
  
  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;
}
