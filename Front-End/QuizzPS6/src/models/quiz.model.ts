import { Question } from './question.model';

export interface Quiz {
    name: string;
    themeId?: number;
    creationDate?: Date;
    numberOfQuestion?: number;
    questions: Question[];
    id?: number;
}

export interface NewQuiz {
    name?: string;
    theme?: string;
    themeId?: number;
}
