import { Attempt } from './attempt.model';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    attempts: Attempt[];
    // User Params
    nextQuestionFollows: boolean;
    bigPointer: boolean;
    previousQuestion: boolean;
    repeatQuestion: boolean;
    answersColor: boolean;
    displayScore: boolean;
}
