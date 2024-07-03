import { Button, Checkbox, Flex, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Todo } from '../app/types/Todo';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    addSubtodos,
    editTodo,
    removeTodo,
    toggleTodo,
} from '../feautures/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
type Props = {
    todo: Todo;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const TodoDetails = ({ todo, open, setOpen }: Props) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Todo>({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        subTodo: todo.subTodo,
    });
    const [openS, setOpenS] = useState<boolean>(false);
    const [form] = Form.useForm();
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        console.log('change');
        console.log(value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleEdit = () => {
        console.log(formData);
        dispatch(editTodo(formData));
    };
    const addSubtodo = (formData: Todo) => {
        const subtodo: Todo = {
            id: uuidv4(),
            title: formData.title,
            description: formData.description,
            completed: false,
            subTodo: [],
        };
        const id = todo.id;
        dispatch(addSubtodos({ id, subtodo }));
        setOpenS(false);
        form.resetFields();
    };

    const remove = (id: string) => {
        dispatch(removeTodo(id));
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleComplete = (todo: Todo) => {
        dispatch(toggleTodo(todo));
    };
    return (
        <Modal open={open} onCancel={handleClose} footer={false}>
            <Form onFinish={handleEdit}>
                <Flex vertical gap={8} style={{ marginTop: '24px' }}>
                    <Flex>
                        <Checkbox
                            name='completed'
                            checked={formData.completed}
                            onChange={() => handleComplete(todo)}
                        ></Checkbox>
                        <Input
                            name='title'
                            value={formData.title}
                            variant='borderless'
                            onChange={handleChange}
                            style={{ fontSize: '18px', marginBottom: '8px' }}
                        ></Input>
                    </Flex>
                    <TextArea
                        name='description'
                        value={formData.description}
                        variant='filled'
                        onChange={handleChange}
                    />
                    {todo.subTodo.map((st) => (
                        <TodoItem todo={st} />
                    ))}
                    <Button
                        type='primary'
                        style={{ width: '160px' }}
                        onClick={() => setOpenS(true)}
                    >
                        Добавить подзадачу
                    </Button>
                </Flex>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '1rem',
                    }}
                >
                    <Button htmlType='submit'>Сохранить</Button>
                    <Button
                        type='primary'
                        danger
                        onClick={() => remove(todo.id)}
                    >
                        Удалить задачу
                    </Button>
                </div>
            </Form>
            <Modal footer={false} open={openS} onCancel={() => setOpenS(false)}>
                <Form
                    onFinish={addSubtodo}
                    form={form}
                    style={{ width: '90%' }}
                >
                    <Form.Item name='title'>
                        <Input placeholder='Название подзадачи'></Input>
                    </Form.Item>
                    <Form.Item name='description'>
                        <TextArea placeholder='Описание...'></TextArea>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Добавить
                    </Button>
                </Form>
            </Modal>
        </Modal>
    );
};
export default TodoDetails;
