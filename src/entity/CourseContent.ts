import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseTopic } from './CourseTopic';
import { User } from './User';

export interface ICourseContent {
    type: string;
    text: string;
    videoUrl: string;
    imageUrl: string;
}

export enum CourseContentType {
    TEXT = 1,
    IMAGE = 2,
    VIDEO = 3,
}

@Entity('courseContent')
export class CourseContent extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('jsonb')
    content: ICourseContent[];

    @Column()
    topicId: number;

    @ManyToOne(() => CourseTopic)
    topic: CourseTopic;

    @ManyToOne(() => User)
    createdBy: User;

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
