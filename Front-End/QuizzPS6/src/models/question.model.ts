export class Answer {
  type?: string;
  value: string;
  isCorrect: boolean;
}

export class Question {
  id: string;
  label: string;
  answers: Answer[];
}
