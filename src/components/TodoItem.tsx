import { Checkbox, Flex } from 'antd';
import { Todo } from '../app/types/Todo';
import { useState } from 'react';
import TodoDetails from './TodoDetails';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../feautures/todoSlice';
import { AlignLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './TodoItem.module.css';
import React from 'react';

const TodoItem = ({ todo }: { todo: Todo }) => {
    const [open, setOpen] = useState(false);
    const [isShowSubTask, setIsShowSubTask] = useState<boolean>(false);
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (todo: Todo) => {
        dispatch(toggleTodo(todo));
    };

    const toggleShowSubTask = () => {
        setIsShowSubTask(!isShowSubTask);
    };

    const remove = (id: string) => {
        dispatch(removeTodo(id));
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <Flex gap={8}>
                <AlignLeftOutlined onClick={toggleShowSubTask} />
                <Checkbox
                    checked={todo.completed}
                    onChange={() => handleChange(todo)}
                />
                <p onClick={handleOpen}>{todo.title}</p>
                <DeleteOutlined onClick={() => remove(todo.id)} />
            </Flex>
            {todo.subTodo.length > 0 && (
                <div className={isShowSubTask ? styles.subTasks : styles.hide}>
                    {todo.subTodo.map((subTask) => (
                        <TodoItem key={subTask.id} todo={subTask} />
                    ))}
                </div>
            )}
            <TodoDetails todo={todo} open={open} setOpen={setOpen} />
        </React.Fragment>
    );
};
export default TodoItem;
