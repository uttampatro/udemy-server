import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    BaseEntity,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Course } from './Course';
import { User } from './User';
@Entity('cart')
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Course, course => course.cart)
    @JoinColumn()
    courses: Course[];

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;
}
