export type Status = "in-progress" | "pending" | "completed";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: Status;
}