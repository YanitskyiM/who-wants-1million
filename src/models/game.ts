export interface IGame {
  questions: Array<IQuestion>;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: Array<IAnswer>;
  correctAnswerIds: [number];
  reward: number;
}

export interface IAnswer {
  id: number;
  text: string;
}
