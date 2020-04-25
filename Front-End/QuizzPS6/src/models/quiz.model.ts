import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme?: string;
    questions: Question[];
    id?: string;
}

export interface NewQuiz {
    name?: string;
    theme?: string;
    themeId?: number;
}
