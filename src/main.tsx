import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import MyPlantsView from './views/MyPlantsView'
import MyPlantDetailView, { loader } from './views/MyPlantDetailView'
import NewPlantView from './views/NewPlantView'

const router = createHashRouter([
  {
    "path": "/",
    "element": <MyPlantsView />
  },
  {
    "path": "/plant/new",
    "element": <NewPlantView />
  },
  {
    "loader": loader,
    "path": "/plant/:plantid",
    "element": <MyPlantDetailView />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
