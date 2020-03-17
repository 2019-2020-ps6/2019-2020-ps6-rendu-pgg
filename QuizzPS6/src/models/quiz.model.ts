import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme?: string;
    creationDate?: Date;
    questions: Question[];
}
