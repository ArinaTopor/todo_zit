export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    subTodo: Todo[];
}

export type RecursionProps = (id: string, array: Todo[], task: Todo) => Todo[];

export type CompleteTogglerProps = (array: Todo[], state: boolean) => Todo[];
