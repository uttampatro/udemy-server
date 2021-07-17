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
    id: number;

    @ManyToOne(() => Course, course => course.cart)
    courses: Course[];

    @OneToOne(() => User, user => user.id, {
        cascade: true,
    })
    @JoinColumn()
    user: User;
}
