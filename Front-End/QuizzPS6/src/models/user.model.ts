import { Attempt } from './attempt.model';

export class User {
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
