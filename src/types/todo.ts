export interface ITodo {
  id: number;
  title: string;
  created_at: string;
}

export interface ITodoItem {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: boolean | any;
  priority: string;
}

export enum Priority {}
