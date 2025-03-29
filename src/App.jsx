import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DefaultLayout from "./layout/DefaultLayout"
import BlankLayout from './layout/BlankLayout'
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import NotFound from "./pages/NotFound"
import { GlobalProvider } from "./context/GlobalContext"


function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Navigate to='/tasks' replace />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/add-task" element={<AddTask />} />
            </Route>
            <Route element={<BlankLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
