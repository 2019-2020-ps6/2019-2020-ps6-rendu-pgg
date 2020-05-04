import { User } from '../models/user.model';

export const USER_JOJO: User = {
    id: '1234',
    firstName: 'Jonathan',
    lastName: 'Joestar',
    attempts: [],
    nextQuestionFollows: false,
    bigPointer: false,
    previousQuestion: false,
    repeatQuestion: true,
    answersColor: true,
    displayScore: true,
};

export const USER_LIST: User[] = [
    USER_JOJO
];
