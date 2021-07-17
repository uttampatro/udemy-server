import { ICourseContent } from '../../entity/CourseContent';

export interface CreateCourseDTO {
    userId: number;
    imageUrl: string;
    name: string;
    price: number;
}

export interface CreateTopicDTO {
    name: string;
    courseId: string;
    userId: number;
}

export interface CreateCourseContentDTO {
    content: ICourseContent[];
    topicId: number;
    userId: number;
}

export interface FindTopicListDTO {
    courseId: string;
}

export interface AddToCartDTO {
    courseId: string;
    userId: number;
}

export interface FindCourseDTO {
    cartId: string;
}
