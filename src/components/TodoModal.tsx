import { Button, Flex, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../feautures/todoSlice';
import { Todo } from '../app/types/Todo';
import styles from './TodoModal.module.css';
const TodoModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(!open);
    };
    const createTodo = (data: Todo) => {
        dispatch(addTodo(data));
        form.resetFields();
    };

    return (
        <Flex>
            <Button
                onClick={handleOpen}
                className={styles.add_todo}
                type='primary'
            >
                Создать задачу
            </Button>
            <Modal open={open} onCancel={handleOpen} footer={false}>
                <Form
                    autoComplete='off'
                    onFinish={createTodo}
                    style={{ padding: '25px' }}
                    form={form}
                >
                    <Form.Item
                        name='title'
                        rules={[
                            { required: true, message: 'Обязательное поле' },
                        ]}
                    >
                        <Input placeholder='Название задачи'></Input>
                    </Form.Item>
                    <Form.Item name='description'>
                        <TextArea
                            rows={4}
                            placeholder='Описание задачи...'
                        ></TextArea>
                    </Form.Item>
                    <Form.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '24px',
                            marginBottom: 0,
                        }}
                    >
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='large'
                            style={{ width: '100px' }}
                        >
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Flex>
    );
};
export default TodoModal;
