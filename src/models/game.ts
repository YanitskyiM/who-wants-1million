export interface IGame {
  questions: Array<IQuestion>;
}

export interface IQuestion {
  id: string;
  questionOrder: number;
  question: string;
  answers: Array<IAnswer>;
  correctAnswerIds: Array<string>;
  reward: number;
}

export interface IAnswer {
  id: string;
  text: string;
}
