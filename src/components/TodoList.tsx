import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TodoItem from './TodoItem';
import { Todo } from '../app/types/Todo';
import { UpOutlined } from '@ant-design/icons';
import styles from './TodoList.module.css';
import { Flex } from 'antd';
import { useState } from 'react';
const TodoList = () => {
    const todos = useSelector((state: RootState) => state.todos.todoList);
    const [showList, setShowList] = useState(false);
    const toggleShow = () => {
        setShowList(!showList);
        console.log(showList);
    };
    return (
        <div className={styles.list_container}>
            <h3>Ожидают выполнения</h3>
            {todos.length > 0 ? (
                todos.map(
                    (todo: Todo) =>
                        !todo.completed && (
                            <TodoItem key={todo.id} todo={todo} />
                        )
                )
            ) : (
                <p>No todos available</p>
            )}
            <Flex gap={8} style={{ marginTop: '2rem' }}>
                <UpOutlined
                    onClick={toggleShow}
                    rotate={showList ? 180 : 360}
                />
                <h3>Выполнено</h3>
            </Flex>
            {todos.length > 0 && (
                <div className={showList ? styles.list_show : styles.list_hide}>
                    {todos.map(
                        (todo: Todo) =>
                            todo.completed && (
                                <TodoItem key={todo.id} todo={todo} />
                            )
                    )}
                </div>
            )}
        </div>
    );
};
export default TodoList;
