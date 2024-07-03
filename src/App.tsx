import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import MainPage from './page/MainPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
]);
function App() {
    return (
        <Provider store={store}>
            <ConfigProvider>
                <RouterProvider router={router} />
            </ConfigProvider>
        </Provider>
    );
}

export default App;
