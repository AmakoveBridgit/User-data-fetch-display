import './App.css';
import EditPage from './components/EditUserPage';
import UserList from './components/UserList';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div>
     {/* <UserList/> */}

  <BrowserRouter>
    <Routes>
   <Route index element={<UserList/>}/>
      <Route path="/userlist" element={<UserList/>} />
      <Route path="/EditUserPage/:userId" element={<EditPage/>} />
    </Routes>

    </BrowserRouter>
  
</div>
    
  );
}

export default App;











