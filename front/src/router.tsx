import { createBrowserRouter } from 'react-router-dom'
import LayoutComponent from './components/Layout'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'

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
        path: '/:token',
        element: <ListPage />,
      },
    ],
  },
])
