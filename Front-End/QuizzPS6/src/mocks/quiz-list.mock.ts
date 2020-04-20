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
        themeId: 1,
        questions: [QUESTION_ACTOR],
        numberOfQuestion: 5,
    },
    {
        name: 'Les Jeux Olympiques',
        themeId: 2,
        questions: [QUESTION_SPORT],
        numberOfQuestion: 5,
    }
];
