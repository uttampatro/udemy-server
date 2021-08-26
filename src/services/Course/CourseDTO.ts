import { ICourseContent } from '../../entity/CourseContent';

export interface CreateCourseDTO {
    userId: string;
    imageUrl: string;
    name: string;
    price: string;
}

export interface CreateTopicDTO {
    sequence: number;
    name: string;
    courseId: string;
    userId: string;
}

export interface CreateCourseContentDTO {
    title: string;
    sequence: number;
    data: ICourseContent;
    topicId: string;
    userId: string;
}

export interface FindTopicListDTO {
    courseId: string;
}

export interface FindContentListDTO {
    topicId: string;
}

export interface AddToCartDTO {
    courseId: string;
    userId: string;
}

export interface FindCourseDTO {
    cartId: string;
}
