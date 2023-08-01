import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Text from "./Text";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  // @ts-ignore
  firstName: string;

  @Column()
  // @ts-ignore
  lastName: string;

  @Column({ unique: true, select: false })
  // @ts-ignore
  username: string;

  @Column({ select: false })
  // @ts-ignore
  password: string;

  @Column({ select: false })
  // @ts-ignore
  authToken: string;

  @OneToMany(() => Text, (Text) => Text.user, { eager: true })
  //@ts-ignore
  texts: Text[];
}
