export interface Task {
    name: string;
    category_id: number | null;
}

export interface TaskList {
    id: number;
    name: string;
    category_id: number;
    completed: number
}