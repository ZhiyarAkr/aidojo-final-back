import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Text extends BaseEntity {
  @PrimaryGeneratedColumn()
  //@ts-ignore
  id: number;

  @Column()
  //@ts-ignore
  text: string;

  @CreateDateColumn()
  //@ts-ignore
  date: Date;

  @ManyToOne(() => User, (user) => user.texts)
  //@ts-ignore
  user: User;
}
