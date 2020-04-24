import { Question } from './question.model';

export interface Quiz {
    name: string;
    themeId?: string;
    creationDate?: Date;
    numberOfQuestion?: number;
    questions: Question[];
    id?: string;
}

export interface NewQuiz {
    name?: string;
    theme?: string;
    themeId?: number;
}
