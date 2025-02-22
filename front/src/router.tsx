import { createBrowserRouter } from 'react-router-dom';
import LayoutComponent from './components/Layout';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'tasks',
        element: <div>test home</div>,
      },
    ],
  },
])
