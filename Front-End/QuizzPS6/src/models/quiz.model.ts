import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme?: string;
    themeId?: number;
    creationDate?: Date;
    questions: Question[];
}

export interface NewQuiz {
    name?: string;
    theme?: string;
    themeId?: number;
}
