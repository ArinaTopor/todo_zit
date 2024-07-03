import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../app/types/Todo';
import { v4 as uuidv4 } from 'uuid';
type InitialState = {
    todoList: Todo[];
};

const initialState: InitialState = {
    todoList: [
        {
            id: uuidv4(),
            title: 'Приготовить еду',
            description: 'Рецепт',
            completed: false,
            subTodo: [],
        },
    ],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todoList.push({
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
                subTodo: [],
            });
        },
        removeTodo(state, action) {
            function recursionFilter(todoList: Todo[]) {
                return todoList.reduce((arr: Todo[], item: Todo) => {
                    if (item.id !== action.payload) {
                        arr.push({
                            ...item,
                            subTodo: recursionFilter(item.subTodo),
                        });
                    }

                    return arr;
                }, []);
            }
            return {
                ...state,
                todoList: recursionFilter(state.todoList),
            };
        },
        toggleTodo(state, action) {
            function resursionToggleTodo(todoList: Todo[]): Todo[] {
                return todoList.reduce((arr: Todo[], item: Todo) => {
                    if (item.id === action.payload.id) {
                        arr.push({
                            ...item,
                            completed: !item.completed,
                            subTodo: togglerSubtodos(
                                item.subTodo,
                                !item.completed
                            ),
                        });
                    } else {
                        arr.push({
                            ...item,
                            subTodo: resursionToggleTodo(item.subTodo),
                        });
                    }
                    return arr;
                }, []);
            }
            function togglerSubtodos(
                todos: Todo[],
                isCompleted: boolean
            ): Todo[] {
                return todos.reduce((arr: Todo[], item) => {
                    arr.push({
                        ...item,
                        completed: isCompleted,
                        subTodo: togglerSubtodos(item.subTodo, isCompleted),
                    });

                    return arr;
                }, []);
            }

            return {
                ...state,
                todoList: resursionToggleTodo(state.todoList),
            };
            // const toggledTodo = state.todoList.find(
            //     (todo) => todo.id === action.payload.id
            // );
            // if (toggledTodo) {
            //     toggledTodo.completed = !toggledTodo.completed;
            // }
        },
        editTodo(state, action) {
            console.log(action);
            const editTodo = state.todoList.find(
                (todo) => todo.id === action.payload.id
            );
            if (editTodo) {
                editTodo.description = action.payload.description;
                editTodo.subTodo = action.payload.subTodo;
                editTodo.title = action.payload.title;
            }
        },
        addSubtodos(state, action) {
            console.log(action);
            const { id, subtodo } = action.payload;
            function addSubtodosRecursive(todoList: Todo[]): Todo[] {
                return todoList.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, subTodo: [...todo.subTodo, subtodo] };
                    } else if (todo.subTodo.length > 0) {
                        return {
                            ...todo,
                            subTodo: addSubtodosRecursive(todo.subTodo),
                        };
                    }
                    return todo;
                });
            }
            return {
                ...state,
                todoList: addSubtodosRecursive(state.todoList),
            };
        },
    },
});
export const { addTodo, toggleTodo, removeTodo, editTodo, addSubtodos } =
    todoSlice.actions;
export default todoSlice.reducer;
