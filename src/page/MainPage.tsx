import { Flex } from 'antd';
import TodoModal from '../components/TodoModal';
import TodoList from '../components/TodoList';
import styles from './MainPage.module.css';

const MainPage = () => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month =
        newDate.getMonth() + 1 < 10
            ? `0${newDate.getMonth() + 1}`
            : newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return (
        <Flex vertical className={styles.main_wrapper}>
            <div style={{ textAlign: 'center' }}>
                <h1 className={styles.main_title}>Сегодня</h1>
                <p>
                    {date}.{month}.{year}
                </p>
            </div>
            <hr className={styles.line} />
            <TodoModal />
            <TodoList />
        </Flex>
    );
};
export default MainPage;
