export interface Todo {
  title: string;
  content: string;
  selected: boolean;
  createdAt: Date;
}
export interface TodoWithId {
  id: number;
  title: string;
  content: string;
  selected: boolean;
  createAt: Date;
}
