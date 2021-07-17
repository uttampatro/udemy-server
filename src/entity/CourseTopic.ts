import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './Course';
import { CourseContent } from './CourseContent';
import { User } from './User';

@Entity('courseTopic')
export class CourseTopic extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column('uuid')
    courseId: string;

    @ManyToOne(() => Course)
    course: Course;

    @ManyToOne(() => User)
    createdBy: User;

    @OneToMany(() => CourseContent, courseContent => courseContent.content)
    courseContent: CourseContent[];

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
