import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    label: 'Charles Manson a joué dans...',
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: true,
        },
        {
            value: 'Avengers Infinity War',
            isCorrect: false,
        }
    ]
};

export const QUESTION_SPORT: Question = {
    label: 'Le record du monde 100m est détenu par...',
    answers: [
        {
            value: 'Usain Bolt',
            isCorrect: false,
        },
        {
            value: 'Franky Vincent',
            isCorrect: true,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Antiquité',
        questions: [QUESTION_ACTOR],
    },
    {
        name: 'Les Jeux Olympiques',
        questions: [QUESTION_SPORT],
    }
];
