import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from "./pages/Home"
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout'
import Task from './pages/Task';
import TaskAdd from './pages/TaskAdd'
import { useSelector } from 'react-redux';
import NotFound from './pages/NotFound';
import TaskDetails from './pages/TaskDetails';
import TaskUpdate from './pages/TaskUpdate';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';

function App() {
  let userInfo = useSelector((state) => { return state.auth.userInfo })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Home' element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Task" element={userInfo ? <Task /> : <Navigate to="/Login" />} />
          <Route path="/createTask" element={userInfo ? <TaskAdd /> : <Navigate to="/Login" />} />
          <Route path="/detailTask/:id" element={userInfo ? <TaskDetails /> : <Navigate to="/Login" />} />
          <Route path="/updateTask/:id" element={userInfo ? <TaskUpdate /> : <Navigate to="/Login" />} />
          <Route path="/Register" element={userInfo ? <Navigate to="/Login" /> : <Register />} />
          <Route path="/Login" element={userInfo ? <Navigate to="/Task" /> : <Login />} />
          <Route path="/Logout" element={userInfo ? <Logout /> : <Navigate to="/Login" />} />
          <Route path='/ForgetPassword' element={!userInfo ? <ForgetPassword /> : <Navigate to='/ResetPassword' />} />
          <Route path='/ResetPassword' element={!userInfo ? <ResetPassword /> : <Navigate to='/Login' />} />
          <Route path='/ChangePassword' element={userInfo ? <ChangePassword /> : <Navigate to='/Login' />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;