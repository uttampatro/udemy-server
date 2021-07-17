import { ICourseContent } from '../../entity/CourseContent';

export interface CreateCourseDTO {
    userId: string;
    imageUrl: string;
    name: string;
    price: number;
}

export interface CreateTopicDTO {
    name: string;
    courseId: string;
    userId: string;
}

export interface CreateCourseContentDTO {
    content: ICourseContent[];
    topicId: string;
    userId: string;
}

export interface FindTopicListDTO {
    courseId: string;
}

export interface AddToCartDTO {
    courseId: string;
    userId: string;
}

export interface FindCourseDTO {
    cartId: string;
}
